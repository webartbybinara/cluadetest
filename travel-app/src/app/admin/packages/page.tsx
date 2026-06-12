import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'
import DeletePackageButton from './DeleteButton'

export default async function AdminPackages() {
  const packages = await prisma.package.findMany({ include: { destination: true }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Packages</h1>
        <Link href="/admin/packages/new" className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600">
          <Plus className="w-4 h-4" /> Add Package
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-gray-500">Destination</th>
              <th className="px-4 py-3 text-left text-gray-500">Price</th>
              <th className="px-4 py-3 text-left text-gray-500">Duration</th>
              <th className="px-4 py-3 text-left text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p: any) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-gray-500">{p.destination.name}</td>
                <td className="px-4 py-3">${Number(p.price).toLocaleString()}</td>
                <td className="px-4 py-3">{p.duration} days</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Link href={`/admin/packages/${p.id}/edit`} className="text-sky-500 hover:underline">Edit</Link>
                  <DeletePackageButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
