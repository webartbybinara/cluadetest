'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const statuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']

export default function UpdateBookingStatus({ id, current }: { id: string; current: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: e.target.value }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <select defaultValue={current} onChange={handleChange} disabled={loading}
      className="border rounded-lg px-2 py-1 text-sm outline-none focus:border-sky-500 disabled:opacity-50">
      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  )
}
