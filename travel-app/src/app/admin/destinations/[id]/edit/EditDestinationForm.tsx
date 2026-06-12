'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditDestinationForm({ destination }: { destination: any }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: destination.name,
    country: destination.country,
    description: destination.description,
    image: destination.image,
    featured: destination.featured,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/destinations/${destination.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin/destinations')
      router.refresh()
    } else {
      setError('Failed to update destination')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
        <span className="text-sm text-gray-700">Featured on homepage</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 disabled:opacity-50 cursor-pointer">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  )
}
