'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">Get in touch and we&apos;ll get back to you as soon as possible</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
          {[{ icon: Mail, label: 'Email', val: 'info@travelease.com' }, { icon: Phone, label: 'Phone', val: '+1 (555) 123-4567' }, { icon: MapPin, label: 'Address', val: '123 Travel St, New York' }].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{label}</p>
                <p className="text-gray-500 text-sm">{val}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2">
          {status === 'success' && <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6">Message sent! We&apos;ll be in touch soon.</div>}
          {status === 'error' && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">Something went wrong. Please try again.</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
            </div>
            <button type="submit" disabled={status === 'loading'} className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:opacity-60">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
