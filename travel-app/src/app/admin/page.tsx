import { prisma } from '@/lib/prisma'
import { DollarSign, MapPin, Package, CalendarCheck } from 'lucide-react'

export default async function AdminDashboard() {
  const [totalBookings, totalDestinations, totalPackages, revenueData, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.destination.count(),
    prisma.package.count(),
    prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { status: { not: 'CANCELLED' } } }),
    prisma.booking.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { package: true } }),
  ])
  const totalRevenue = Number(revenueData._sum.totalPrice || 0)

  const stats = [
    { label: 'Total Bookings', value: totalBookings, icon: CalendarCheck, color: 'bg-blue-500' },
    { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Destinations', value: totalDestinations, icon: MapPin, color: 'bg-orange-500' },
    { label: 'Packages', value: totalPackages, icon: Package, color: 'bg-purple-500' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{label}</p>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-3">Guest</th>
                <th className="pb-3">Package</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b: any) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{b.guestName}</td>
                  <td className="py-3">{b.package.title}</td>
                  <td className="py-3">{new Date(b.travelDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3">${Number(b.totalPrice).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
