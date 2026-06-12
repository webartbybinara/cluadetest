import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@travelease.com' },
    update: {},
    create: { email: 'admin@travelease.com', name: 'Admin User', password: adminPassword, role: 'ADMIN' },
  })
  console.log('Created admin:', admin.email)

  // Destinations
  const destinations = await Promise.all([
    prisma.destination.upsert({ where: { id: 'dest-bali' }, update: {}, create: { id: 'dest-bali', name: 'Bali', country: 'Indonesia', description: 'A tropical paradise known for its beautiful temples, stunning rice terraces, vibrant culture, and world-class surfing beaches.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', featured: true } }),
    prisma.destination.upsert({ where: { id: 'dest-paris' }, update: {}, create: { id: 'dest-paris', name: 'Paris', country: 'France', description: 'The City of Light dazzles with iconic landmarks, world-class cuisine, and an unmatched cultural scene that draws millions of visitors annually.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', featured: true } }),
    prisma.destination.upsert({ where: { id: 'dest-maldives' }, update: {}, create: { id: 'dest-maldives', name: 'Maldives', country: 'Maldives', description: 'Crystal clear waters, pristine white sand beaches, and luxurious overwater bungalows make this archipelago a dream destination.', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', featured: true } }),
    prisma.destination.upsert({ where: { id: 'dest-tokyo' }, update: {}, create: { id: 'dest-tokyo', name: 'Tokyo', country: 'Japan', description: 'A fascinating blend of ultramodern and traditional, from neon-lit skyscrapers to historic temples and some of the world\'s best food.', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', featured: true } }),
    prisma.destination.upsert({ where: { id: 'dest-santorini' }, update: {}, create: { id: 'dest-santorini', name: 'Santorini', country: 'Greece', description: 'Famous for its stunning sunsets, white-washed buildings with blue domes, and the best volcanic beaches in the Mediterranean.', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', featured: true } }),
  ])
  console.log('Created destinations:', destinations.length)

  // Packages
  const packages = await Promise.all([
    prisma.package.upsert({ where: { id: 'pkg-bali-1' }, update: {}, create: { id: 'pkg-bali-1', title: 'Bali Tropical Escape', description: 'Immerse yourself in Bali\'s magical atmosphere with this all-inclusive 7-day retreat featuring temple visits, spa treatments, and beach relaxation.', price: 1299, duration: 7, maxGuests: 12, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', includes: 'Return flights\n7 nights hotel accommodation\nDaily breakfast and dinner\nTemple tours with local guide\nSpa treatment (1 session)\nAirport transfers\nTravel insurance', featured: true, active: true, destinationId: 'dest-bali' } }),
    prisma.package.upsert({ where: { id: 'pkg-paris-1' }, update: {}, create: { id: 'pkg-paris-1', title: 'Paris Romantic Getaway', description: 'Experience the magic of Paris with your partner on this romantic 5-day package including Eiffel Tower dinner and Seine river cruise.', price: 1899, duration: 5, maxGuests: 8, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', includes: 'Return flights\n5 nights boutique hotel\nBreakfast daily\nEiffel Tower skip-the-line tickets\nSeine River cruise dinner\nLouvre Museum entry\nAirport transfers', featured: true, active: true, destinationId: 'dest-paris' } }),
    prisma.package.upsert({ where: { id: 'pkg-maldives-1' }, update: {}, create: { id: 'pkg-maldives-1', title: 'Maldives Luxury Honeymoon', description: 'The ultimate luxury honeymoon experience with overwater bungalow, private beach, snorkeling and world-class dining.', price: 3999, duration: 7, maxGuests: 2, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', includes: 'Return flights\n7 nights overwater bungalow\nAll meals included\nSnorkeling equipment\nPrivate beach access\nSunset dolphin cruise\nCouple spa treatment\nAirport speedboat transfer', featured: true, active: true, destinationId: 'dest-maldives' } }),
    prisma.package.upsert({ where: { id: 'pkg-tokyo-1' }, update: {}, create: { id: 'pkg-tokyo-1', title: 'Tokyo Cultural Explorer', description: 'Discover the unique blend of ancient and modern Japan with this comprehensive 8-day Tokyo exploration package.', price: 2299, duration: 8, maxGuests: 15, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', includes: 'Return flights\n8 nights hotel\nBreakfast daily\nTokyo city pass\nTeahouse experience\nSumo tournament tickets\nDay trip to Mt. Fuji\nAirport transfers', featured: false, active: true, destinationId: 'dest-tokyo' } }),
    prisma.package.upsert({ where: { id: 'pkg-santorini-1' }, update: {}, create: { id: 'pkg-santorini-1', title: 'Santorini Sunset Paradise', description: 'Watch the world-famous Santorini sunset from your private villa terrace on this exclusive 6-day Greek island experience.', price: 2799, duration: 6, maxGuests: 10, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', includes: 'Return flights\n6 nights clifftop villa\nBreakfast daily\nWine tasting tour\nVolcano boat trip\nCooking class\nAirport transfers\nConcierge service', featured: false, active: true, destinationId: 'dest-santorini' } }),
  ])
  console.log('Created packages:', packages.length)

  // Sample bookings
  await prisma.booking.upsert({
    where: { id: 'booking-1' },
    update: {},
    create: { id: 'booking-1', packageId: 'pkg-bali-1', guestName: 'John Doe', guestEmail: 'john@example.com', guestPhone: '+1234567890', guests: 2, travelDate: new Date('2024-06-15'), status: 'CONFIRMED', totalPrice: 2598 },
  })
  await prisma.booking.upsert({
    where: { id: 'booking-2' },
    update: {},
    create: { id: 'booking-2', packageId: 'pkg-paris-1', guestName: 'Jane Smith', guestEmail: 'jane@example.com', guestPhone: '+0987654321', guests: 2, travelDate: new Date('2024-07-20'), status: 'PENDING', totalPrice: 3798 },
  })
  console.log('Created sample bookings')
  console.log('Seeding complete!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
