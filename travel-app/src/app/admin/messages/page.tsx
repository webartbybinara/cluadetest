'use client'
import { useState, useEffect } from 'react'

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])

  const load = () => fetch('/api/contact').then(r => r.json()).then(setMessages)
  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: true }) })
    load()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {messages.map((m: any) => (
          <div key={m.id} className={`bg-white rounded-xl shadow p-5 ${!m.read ? 'border-l-4 border-sky-500' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-800">{m.name} <span className="text-gray-400 font-normal text-sm">— {m.email}</span></p>
                <p className="text-sky-600 font-medium mt-1">{m.subject}</p>
                <p className="text-gray-600 mt-2">{m.message}</p>
                <p className="text-gray-400 text-xs mt-2">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              {!m.read && (
                <button onClick={() => markRead(m.id)} className="text-xs bg-sky-100 text-sky-600 px-3 py-1.5 rounded-lg hover:bg-sky-200 flex-shrink-0">
                  Mark Read
                </button>
              )}
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
      </div>
    </div>
  )
}
