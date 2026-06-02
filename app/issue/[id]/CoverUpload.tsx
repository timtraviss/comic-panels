'use client'
import { useState, useRef } from 'react'
import styles from './CoverUpload.module.css'

interface Props {
  issueId: string
  hasCover: boolean
}

export default function CoverUpload({ issueId, hasCover }: Props) {
  const [loading, setLoading] = useState(false)
  const [currentHasCover, setCurrentHasCover] = useState(hasCover)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setLoading(true)
    const formData = new FormData()
    formData.append('issueId', issueId)
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload-cover', { method: 'POST', body: formData })
      if (!res.ok) {
        const { error } = await res.json()
        alert(`Upload failed: ${error}`)
        return
      }
      setCurrentHasCover(true)
      setLoading(false)
      window.location.reload()
    } catch {
      alert('Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Remove this cover image?')) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/delete-cover', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId }),
      })
      if (!res.ok) {
        alert('Delete failed.')
        return
      }
      setCurrentHasCover(false)
      setLoading(false)
      window.location.reload()
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        className={styles.btn}
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        {loading ? 'Working...' : currentHasCover ? 'Replace cover' : 'Upload cover'}
      </button>
      {currentHasCover && (
        <button
          className={`${styles.btn} ${styles.danger}`}
          onClick={handleDelete}
          disabled={loading}
        >
          Delete cover
        </button>
      )}
      <input
        ref={inputRef}
        className={styles.hiddenInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}
