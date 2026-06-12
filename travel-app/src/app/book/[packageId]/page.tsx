'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'

export default function BookPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = use(params)
  const router = useRouter()
  const [pkg, setPkg] = useState<any>(null)
  const [form, setForm] = useState({ guestName: '', guestEmail: '', guestPhone: '', guests: 1, travelDate: '', notes: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/packages/${packageId}`).then(r => r.json()).then(setPkg)
  }, [packageId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, packageId }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setTimeout(() => router.push('/'), 3000)
      } else {
        setError(data.error || 'Booking failed')
        setStatus('error')
      }
    } catch {
      setError('Something went wrong')
      setStatus('error')
    }
  }

  if (!pkg) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div></div>

  const totalPrice = Number(pkg.price) * form.guests

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500">Thank you for booking with TravelEase. We&apos;ll contact you shortly. Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Package</h1>
      <p className="text-gray-500 mb-6">You&apos;re booking: <strong>{pkg.title}</strong></p>
      {status === 'error' && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required value={form.guestName} onChange={e => setForm({ ...form, guestName: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={form.guestEmail} onChange={e => setForm({ ...form, guestEmail: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input required value={form.guestPhone} onChange={e => setForm({ ...form, guestPhone: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input required type="number" min={1} max={pkg.maxGuests} value={form.guests} onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <input required type="date" value={form.travelDate} onChange={e => setForm({ ...form, travelDate: e.target.value })} min={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes (optional)</label>
          <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div className="bg-sky-50 rounded-xl p-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>${Number(pkg.price).toLocaleString()} × {form.guests} guest(s)</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 text-lg">
            <span>Total</span>
            <span className="text-sky-600">${totalPrice.toLocaleString()}</span>
          </div>
        </div>
        <button type="submit" disabled={status === 'loading'} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-60">
          {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  )
}
