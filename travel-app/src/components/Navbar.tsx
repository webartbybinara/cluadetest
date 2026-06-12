'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Menu, X, Plane } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-sky-500 font-bold text-xl">
            <Plane className="w-6 h-6" />
            TravelEase
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-sky-500 transition-colors">Home</Link>
            <Link href="/destinations" className="text-gray-700 hover:text-sky-500 transition-colors">Destinations</Link>
            <Link href="/packages" className="text-gray-700 hover:text-sky-500 transition-colors">Packages</Link>
            <Link href="/contact" className="text-gray-700 hover:text-sky-500 transition-colors">Contact</Link>
            {session ? (
              <div className="flex items-center gap-3">
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-orange-500 hover:text-orange-600 font-medium">Admin</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">Logout</button>
              </div>
            ) : (
              <Link href="/login" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">Login</Link>
            )}
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          <Link href="/" className="text-gray-700" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/destinations" className="text-gray-700" onClick={() => setOpen(false)}>Destinations</Link>
          <Link href="/packages" className="text-gray-700" onClick={() => setOpen(false)}>Packages</Link>
          <Link href="/contact" className="text-gray-700" onClick={() => setOpen(false)}>Contact</Link>
          {session ? (
            <>
              {(session.user as any)?.role === 'ADMIN' && (
                <Link href="/admin" className="text-orange-500" onClick={() => setOpen(false)}>Admin Panel</Link>
              )}
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-left text-red-500">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-sky-500" onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}
