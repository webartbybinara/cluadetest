'use client'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({ id, type }: { id: string; type: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this?')) return
    await fetch(`/api/${type}/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm cursor-pointer">
      <Trash2 className="w-4 h-4" /> Delete
    </button>
  )
}
