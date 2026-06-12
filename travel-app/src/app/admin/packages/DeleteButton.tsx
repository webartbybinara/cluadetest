'use client'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeletePackageButton({ id }: { id: string }) {
  const router = useRouter()
  const handleDelete = async () => {
    if (!confirm('Delete this package?')) return
    await fetch(`/api/packages/${id}`, { method: 'DELETE' })
    router.refresh()
  }
  return (
    <button onClick={handleDelete} className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm cursor-pointer">
      <Trash2 className="w-4 h-4" /> Delete
    </button>
  )
}
