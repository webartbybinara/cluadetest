'use client'
import { useRouter } from 'next/navigation'

export default function MarkReadButton({ id }: { id: string }) {
  const router = useRouter()
  const handleClick = async () => {
    await fetch(`/api/contact`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }
  return (
    <button onClick={handleClick} className="text-xs bg-sky-50 text-sky-600 hover:bg-sky-100 px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer">
      Mark Read
    </button>
  )
}
