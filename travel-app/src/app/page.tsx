import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin, Star, Shield, Headphones } from 'lucide-react'

export default async function HomePage() {
  const destinations = await prisma.destination.findMany({ where: { featured: true }, take: 6 }).catch(() => [])
  const packages = await prisma.package.findMany({ where: { featured: true, active: true }, take: 3, include: { destination: true } }).catch(() => [])

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-xl mb-8 text-gray-200">Explore the world&apos;s most beautiful destinations with TravelEase</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/packages" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              Explore Packages
            </Link>
            <Link href="/destinations" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              View Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Popular Destinations</h2>
        <p className="text-center text-gray-500 mb-10">Handpicked destinations for unforgettable experiences</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d: any) => (
            <Link key={d.id} href={`/destinations/${d.id}`} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  {d.country}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{d.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{d.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/destinations" className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
            View All Destinations
          </Link>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Packages</h2>
          <p className="text-center text-gray-500 mb-10">All-inclusive travel packages at great prices</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg: any) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${Number(pkg.price).toLocaleString()}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{pkg.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />{pkg.destination.name}</p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{pkg.duration} days</span>
                    <Link href={`/packages/${pkg.id}`} className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-600 transition-colors">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose TravelEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: 'Best Prices', desc: 'We guarantee the best prices for all our travel packages.' },
            { icon: Shield, title: 'Safe & Secure', desc: 'Your safety and security is our top priority on every trip.' },
            { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock customer support for all your travel needs.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-sky-500" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', text: 'Amazing experience! The trip to Bali was absolutely perfect. TravelEase took care of everything.', rating: 5 },
              { name: 'Michael Chen', text: "Best travel agency I've used. The package to Paris was well-organized and incredibly romantic.", rating: 5 },
              { name: 'Emma Williams', text: 'Incredible service! Our Maldives honeymoon was a dream come true. Highly recommended!', rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-2xl shadow">
                <div className="flex text-yellow-400 mb-3">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-600 mb-4 italic">&quot;{t.text}&quot;</p>
                <p className="font-semibold text-gray-800">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
