import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'
import DeleteDestinationButton from './DeleteButton'

export default async function AdminDestinations() {
  const destinations = await prisma.destination.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Destinations</h1>
        <Link href="/admin/destinations/new" className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600">
          <Plus className="w-4 h-4" /> Add Destination
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-gray-500">Country</th>
              <th className="px-4 py-3 text-left text-gray-500">Featured</th>
              <th className="px-4 py-3 text-left text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((d: any) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3 text-gray-500">{d.country}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${d.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {d.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Link href={`/admin/destinations/${d.id}/edit`} className="text-sky-500 hover:underline">Edit</Link>
                  <DeleteDestinationButton id={d.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
