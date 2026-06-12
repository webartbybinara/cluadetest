import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin } from 'lucide-react'

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">All Destinations</h1>
      <p className="text-gray-500 mb-10">Explore our handpicked travel destinations worldwide</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d: any) => (
          <Link key={d.id} href={`/destinations/${d.id}`} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="relative h-52 overflow-hidden">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {d.featured && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
              )}
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                <MapPin className="w-4 h-4" />{d.country}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">{d.name}</h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{d.description}</p>
              <span className="inline-block mt-3 text-sky-500 text-sm font-medium hover:underline">View Packages →</span>
            </div>
          </Link>
        ))}
      </div>
      {destinations.length === 0 && (
        <p className="text-center text-gray-400 py-20">No destinations available yet.</p>
      )}
    </div>
  )
}
