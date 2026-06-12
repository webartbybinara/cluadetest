import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const destination = await prisma.destination.findUnique({
    where: { id },
    include: { packages: { where: { active: true } } },
  }).catch(() => null)
  if (!destination) notFound()
  return (
    <div>
      <div className="relative h-80">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 text-white">
            <div className="flex items-center gap-2 text-gray-300 mb-2"><MapPin className="w-4 h-4" />{destination.country}</div>
            <h1 className="text-4xl font-bold">{destination.name}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-gray-600 text-lg mb-10">{destination.description}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destination.packages.map((pkg: any) => (
            <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img src={pkg.image} alt={pkg.title} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{pkg.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sky-600 font-bold">${Number(pkg.price).toLocaleString()}</span>
                  <Link href={`/packages/${pkg.id}`} className="bg-sky-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-sky-600">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {destination.packages.length === 0 && <p className="text-gray-500">No packages available for this destination yet.</p>}
      </div>
    </div>
  )
}
