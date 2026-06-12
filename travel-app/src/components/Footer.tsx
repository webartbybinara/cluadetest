import Link from 'next/link'
import { Plane, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
            <Plane className="w-5 h-5 text-sky-400" />
            TravelEase
          </div>
          <p className="text-sm">Your trusted travel partner for unforgettable adventures around the world.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-sky-400">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-sky-400">Destinations</Link></li>
            <li><Link href="/packages" className="hover:text-sky-400">Packages</Link></li>
            <li><Link href="/contact" className="hover:text-sky-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@travelease.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Travel St, NY</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Subscribe for travel deals and tips.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg bg-slate-700 text-white text-sm outline-none" />
            <button className="bg-sky-500 px-4 py-2 rounded-r-lg text-white text-sm hover:bg-sky-600">Go</button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 text-center py-4 text-sm">
        © 2024 TravelEase. All rights reserved.
      </div>
    </footer>
  )
}
