'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormField from '@/app/admin/_components/FormField'
import DeleteButton from '@/app/admin/_components/DeleteButton'
import styles from './PublisherForm.module.css'

interface Publisher {
  id: string
  name: string
  color: string
  founded: number | null
  hq: string | null
  bio: string | null
}

interface Props {
  publisher?: Publisher
}

export default function PublisherForm({ publisher }: Props) {
  const router = useRouter()
  const isEdit = !!publisher

  const [name, setName] = useState(publisher?.name ?? '')
  const [color, setColor] = useState(publisher?.color ?? '#E8743C')
  const [founded, setFounded] = useState(publisher?.founded?.toString() ?? '')
  const [hq, setHq] = useState(publisher?.hq ?? '')
  const [bio, setBio] = useState(publisher?.bio ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = isEdit ? `/api/admin/publishers/${publisher.id}` : '/api/admin/publishers'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color, founded: founded || null, hq: hq || null, bio: bio || null }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Save failed')
        return
      }
      router.push('/admin/publishers?saved=1')
      router.refresh()
    } catch {
      setError('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <FormField label="Name" required>
          <input className="adminInput" value={name} onChange={e => setName(e.target.value)} required />
        </FormField>

        <FormField label="Colour" required>
          <div className={styles.colorRow}>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={color} onChange={e => setColor(e.target.value)} placeholder="#E8743C" required />
          </div>
        </FormField>

        <FormField label="Founded (year)">
          <input className="adminInput" type="number" value={founded} onChange={e => setFounded(e.target.value)} placeholder="1939" />
        </FormField>

        <FormField label="HQ">
          <input className="adminInput" value={hq} onChange={e => setHq(e.target.value)} placeholder="New York, NY" />
        </FormField>
      </div>

      <FormField label="Bio">
        <textarea className="adminInput" value={bio} onChange={e => setBio(e.target.value)} rows={4} />
      </FormField>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" disabled={saving} className={styles.saveBtn}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create publisher'}
        </button>
        {isEdit && (
          <DeleteButton
            id={publisher.id}
            entityName={publisher.name}
            apiPath="/api/admin/publishers"
            redirectTo="/admin/publishers"
            confirmMessage={`Delete ${publisher.name}? This will also delete all its series, issues, and credits. This cannot be undone.`}
          />
        )}
      </div>
    </form>
  )
}
