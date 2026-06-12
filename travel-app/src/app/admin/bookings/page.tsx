'use client'
import { useState, useEffect } from 'react'

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([])

  const load = () => fetch('/api/bookings').then(r => r.json()).then(setBookings)
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    load()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookings</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-500">Guest</th>
              <th className="px-4 py-3 text-left text-gray-500">Package</th>
              <th className="px-4 py-3 text-left text-gray-500">Travel Date</th>
              <th className="px-4 py-3 text-left text-gray-500">Guests</th>
              <th className="px-4 py-3 text-left text-gray-500">Total</th>
              <th className="px-4 py-3 text-left text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b: any) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{b.guestName}</div>
                  <div className="text-gray-400 text-xs">{b.guestEmail}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{b.package?.title}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(b.travelDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-gray-500">{b.guests}</td>
                <td className="px-4 py-3 font-medium">${Number(b.totalPrice).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} className={`px-2 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer ${statusColors[b.status]}`}>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
