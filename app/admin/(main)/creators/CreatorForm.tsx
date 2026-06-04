'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormField from '@/app/admin/_components/FormField'
import DeleteButton from '@/app/admin/_components/DeleteButton'
import styles from './CreatorForm.module.css'

interface Creator {
  id: string
  name: string
  bio: string | null
}

interface Props {
  creator?: Creator
}

export default function CreatorForm({ creator }: Props) {
  const router = useRouter()
  const isEdit = !!creator

  const [name, setName] = useState(creator?.name ?? '')
  const [bio, setBio] = useState(creator?.bio ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = isEdit ? `/api/admin/creators/${creator.id}` : '/api/admin/creators'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio: bio || null }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Save failed')
        return
      }
      router.push('/admin/creators?saved=1')
      router.refresh()
    } catch {
      setError('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormField label="Name" required>
        <input className="adminInput" value={name} onChange={e => setName(e.target.value)} required />
      </FormField>

      <FormField label="Bio">
        <textarea className="adminInput" value={bio} onChange={e => setBio(e.target.value)} rows={4} />
      </FormField>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" disabled={saving} className={styles.saveBtn}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create creator'}
        </button>
        {isEdit && (
          <DeleteButton
            id={creator.id}
            entityName={creator.name}
            apiPath="/api/admin/creators"
            redirectTo="/admin/creators"
            confirmMessage={`Delete ${creator.name}? This will also remove all their credits. This cannot be undone.`}
          />
        )}
      </div>
    </form>
  )
}
