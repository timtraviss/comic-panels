'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  entityName: string
  apiPath: string       // e.g. '/api/admin/publishers'
  redirectTo: string    // e.g. '/admin/publishers'
  confirmMessage: string
}

export default function DeleteButton({ id, entityName, apiPath, redirectTo, confirmMessage }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(confirmMessage)) return
    setLoading(true)
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const { error } = await res.json()
        alert(`Delete failed: ${error}`)
        return
      }
      router.push(redirectTo)
      router.refresh()
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      style={{
        background: 'transparent',
        border: '1px solid #ef4444',
        color: '#ef4444',
        borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 1rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? 'Deleting…' : `Delete ${entityName}`}
    </button>
  )
}
