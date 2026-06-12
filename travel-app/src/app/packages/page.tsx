import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin, Clock, Users } from 'lucide-react'

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { active: true },
    include: { destination: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Travel Packages</h1>
      <p className="text-gray-500 mb-8">All-inclusive packages for every budget and style</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: any) => (
          <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-48">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              {pkg.featured && <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>}
              <div className="absolute top-3 right-3 bg-sky-500 text-white px-3 py-1 rounded-full font-semibold">${Number(pkg.price).toLocaleString()}</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-1">{pkg.title}</h3>
              <div className="flex items-center gap-1 text-gray-400 text-sm mb-3"><MapPin className="w-3 h-3" />{pkg.destination.name}, {pkg.destination.country}</div>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{pkg.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{pkg.duration} days</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />Max {pkg.maxGuests}</span>
              </div>
              <Link href={`/packages/${pkg.id}`} className="block text-center bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
