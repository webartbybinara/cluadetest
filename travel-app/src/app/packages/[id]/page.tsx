import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { MapPin, Clock, Users, CheckCircle } from 'lucide-react'

export default async function PackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { destination: true },
  }).catch(() => null)
  if (!pkg || !pkg.active) notFound()
  const includes = pkg.includes.split('\n').filter(Boolean)
  return (
    <div>
      <div className="relative h-72">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 text-white">
            <h1 className="text-4xl font-bold">{pkg.title}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-1 text-gray-600"><MapPin className="w-4 h-4 text-sky-500" />{(pkg.destination as any).name}, {(pkg.destination as any).country}</span>
            <span className="flex items-center gap-1 text-gray-600"><Clock className="w-4 h-4 text-sky-500" />{pkg.duration} days</span>
            <span className="flex items-center gap-1 text-gray-600"><Users className="w-4 h-4 text-sky-500" />Max {pkg.maxGuests} guests</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">About This Package</h2>
          <p className="text-gray-600 mb-6">{pkg.description}</p>
          <h3 className="text-xl font-bold text-gray-800 mb-3">What&apos;s Included</h3>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
            <div className="text-3xl font-bold text-sky-500 mb-1">${Number(pkg.price).toLocaleString()}</div>
            <p className="text-gray-500 text-sm mb-6">per person</p>
            <Link href={`/book/${pkg.id}`} className="block text-center bg-orange-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors mb-3">
              Book This Package
            </Link>
            <Link href="/contact" className="block text-center border border-sky-500 text-sky-500 py-3 rounded-xl font-semibold hover:bg-sky-50 transition-colors">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
