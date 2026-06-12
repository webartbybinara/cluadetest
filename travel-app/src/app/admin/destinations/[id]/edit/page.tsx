'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'

export default function EditDestination({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [form, setForm] = useState({ name: '', country: '', description: '', image: '', featured: false })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/destinations/${id}`).then(r => r.json()).then(d => setForm({ name: d.name, country: d.country, description: d.description, image: d.image, featured: d.featured }))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/destinations/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    router.push('/admin/destinations')
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Destination</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
          <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 disabled:opacity-60">{loading ? 'Saving...' : 'Save Changes'}</button>
          <button type="button" onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  )
}
