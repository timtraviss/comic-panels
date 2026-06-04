'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormField from '@/app/admin/_components/FormField'
import DeleteButton from '@/app/admin/_components/DeleteButton'
import CreditsEditor, { CreditRow } from '@/app/admin/_components/CreditsEditor'
import styles from './IssueForm.module.css'

interface Series { id: string; name: string }
interface Creator { id: string; name: string }

interface Issue {
  id: string
  seriesId: string
  number: number | null
  title: string | null
  coverDate: string | null
  pages: number | null
  price: string | null
  synopsis: string | null
  credits: CreditRow[]
}

interface Props {
  seriesList: Series[]
  creators: Creator[]
  issue?: Issue
}

export default function IssueForm({ seriesList, creators, issue }: Props) {
  const router = useRouter()
  const isEdit = !!issue

  const [seriesId, setSeriesId] = useState(issue?.seriesId ?? seriesList[0]?.id ?? '')
  const [number, setNumber] = useState(issue?.number?.toString() ?? '')
  const [title, setTitle] = useState(issue?.title ?? '')
  const [coverDate, setCoverDate] = useState(issue?.coverDate ?? '')
  const [pages, setPages] = useState(issue?.pages?.toString() ?? '')
  const [price, setPrice] = useState(issue?.price ?? '')
  const [synopsis, setSynopsis] = useState(issue?.synopsis ?? '')
  const [credits, setCredits] = useState<CreditRow[]>(issue?.credits ?? [])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = isEdit ? `/api/admin/issues/${issue.id}` : '/api/admin/issues'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seriesId,
          number: number || null,
          title: title || null,
          coverDate: coverDate ? `${coverDate}-01` : null,
          pages: pages || null,
          price: price || null,
          synopsis: synopsis || null,
          credits,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Save failed')
        return
      }
      router.push('/admin/issues?saved=1')
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
        <FormField label="Series" required>
          <select className="adminInput" value={seriesId} onChange={e => setSeriesId(e.target.value)} required>
            {seriesList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </FormField>

        <FormField label="Issue number" required>
          <input className="adminInput" type="number" value={number} onChange={e => setNumber(e.target.value)} required />
        </FormField>

        <FormField label="Title">
          <input className="adminInput" value={title} onChange={e => setTitle(e.target.value)} />
        </FormField>

        <FormField label="Cover date">
          <input className="adminInput" type="month" value={coverDate} onChange={e => setCoverDate(e.target.value)} />
        </FormField>

        <FormField label="Pages">
          <input className="adminInput" type="number" value={pages} onChange={e => setPages(e.target.value)} />
        </FormField>

        <FormField label="Price ($)">
          <input className="adminInput" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="3.99" />
        </FormField>
      </div>

      <FormField label="Synopsis">
        <textarea className="adminInput" value={synopsis} onChange={e => setSynopsis(e.target.value)} rows={4} />
      </FormField>

      {creators.length > 0 && (
        <div>
          <p className={styles.creditsLabel}>Credits</p>
          <CreditsEditor credits={credits} creators={creators} onChange={setCredits} />
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" disabled={saving} className={styles.saveBtn}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create issue'}
        </button>
        {isEdit && (
          <DeleteButton
            id={issue.id}
            entityName={`#${issue.number}`}
            apiPath="/api/admin/issues"
            redirectTo="/admin/issues"
            confirmMessage={`Delete issue #${issue.number}? This will also remove all its credits. This cannot be undone.`}
          />
        )}
      </div>
    </form>
  )
}
