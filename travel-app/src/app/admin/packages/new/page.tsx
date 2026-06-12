'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPackage() {
  const router = useRouter()
  const [destinations, setDestinations] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', description: '', price: '', duration: '', maxGuests: '10', image: '', includes: '', featured: false, active: true, destinationId: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/destinations').then(r => r.json()).then(setDestinations)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), duration: parseInt(form.duration), maxGuests: parseInt(form.maxGuests) }),
    })
    if (res.ok) router.push('/admin/packages')
    else setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Package</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <select required value={form.destinationId} onChange={e => setForm({ ...form, destinationId: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500">
            <option value="">Select destination...</option>
            {destinations.map((d: any) => <option key={d.id} value={d.id}>{d.name}, {d.country}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
            <input required type="number" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
            <input required type="number" value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Includes (one per line)</label>
          <textarea required rows={4} value={form.includes} onChange={e => setForm({ ...form, includes: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" placeholder="Hotel accommodation&#10;Flights&#10;Airport transfers" />
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
            <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
            <label htmlFor="active" className="text-sm text-gray-700">Active</label>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 disabled:opacity-60">{loading ? 'Creating...' : 'Create Package'}</button>
          <button type="button" onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  )
}
