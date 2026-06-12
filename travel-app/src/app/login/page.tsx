'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { ...form, redirect: false })
    setLoading(false)
    if (result?.error) setError('Invalid email or password')
    else {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      if (session?.user?.role === 'ADMIN') router.push('/admin')
      else router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 text-sky-500 font-bold text-2xl mb-2">
            <Plane className="w-7 h-7" />
            TravelEase
          </Link>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border rounded-lg px-3 py-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/" className="text-sky-500 hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
