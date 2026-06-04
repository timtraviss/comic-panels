'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FormField from '@/app/admin/_components/FormField'
import DeleteButton from '@/app/admin/_components/DeleteButton'
import CreditsEditor, { CreditRow } from '@/app/admin/_components/CreditsEditor'
import styles from './IssueForm.module.css'

interface Series { id: string; name: string; publisherId: string }
interface Creator { id: string; name: string }
interface Publisher { id: string; name: string }

interface Issue {
  id: string
  seriesId: string
  publisherId: string
  number: number | null
  title: string | null
  coverDate: string | null
  pages: number | null
  price: string | null
  synopsis: string | null
  upc: string | null
  coverImage: string | null
  credits: CreditRow[]
}

interface Props {
  seriesList: Series[]
  creators: Creator[]
  publishers: Publisher[]
  issue?: Issue
}

export default function IssueForm({ seriesList, creators, publishers, issue }: Props) {
  const router = useRouter()
  const isEdit = !!issue
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultPublisherId = issue?.publisherId ?? publishers[0]?.id ?? ''
  const [publisherId, setPublisherId] = useState(defaultPublisherId)

  const filteredSeries = seriesList.filter(s => s.publisherId === publisherId)
  const defaultSeriesId = issue?.seriesId ?? filteredSeries[0]?.id ?? seriesList[0]?.id ?? ''

  const [seriesId, setSeriesId] = useState(defaultSeriesId)
  const [number, setNumber] = useState(issue?.number?.toString() ?? '')
  const [title, setTitle] = useState(issue?.title ?? '')
  const [coverDate, setCoverDate] = useState(issue?.coverDate ?? '')
  const [pages, setPages] = useState(issue?.pages?.toString() ?? '')
  const [price, setPrice] = useState(issue?.price ?? '')
  const [synopsis, setSynopsis] = useState(issue?.synopsis ?? '')
  const [upc, setUpc] = useState(issue?.upc ?? '')
  const [credits, setCredits] = useState<CreditRow[]>(issue?.credits ?? [])
  const [coverUrl, setCoverUrl] = useState<string | null>(issue?.coverImage ?? null)
  const [coverLoading, setCoverLoading] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function handlePublisherChange(pid: string) {
    setPublisherId(pid)
    const first = seriesList.find(s => s.publisherId === pid)
    if (first) setSeriesId(first.id)
  }

  async function handleCoverUpload(file: File) {
    if (!issue) return
    setCoverLoading(true)
    const formData = new FormData()
    formData.append('issueId', issue.id)
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload-cover', { method: 'POST', body: formData })
      if (!res.ok) { const { error } = await res.json(); alert(`Upload failed: ${error}`); return }
      const { url } = await res.json()
      setCoverUrl(url)
    } catch { alert('Upload failed. Please try again.') }
    finally { setCoverLoading(false) }
  }

  async function handleCoverDelete() {
    if (!issue || !confirm('Remove this cover image?')) return
    setCoverLoading(true)
    try {
      const res = await fetch('/api/admin/delete-cover', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId: issue.id }),
      })
      if (!res.ok) { alert('Delete failed.'); return }
      setCoverUrl(null)
    } catch { alert('Delete failed. Please try again.') }
    finally { setCoverLoading(false) }
  }

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
          upc: upc || null,
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

  const currentSeries = filteredSeries.length > 0 ? filteredSeries : seriesList

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <FormField label="Publisher" required>
            <select className="adminInput" value={publisherId} onChange={e => handlePublisherChange(e.target.value)}>
              {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </FormField>

          <FormField label="Series" required>
            <select className="adminInput" value={seriesId} onChange={e => setSeriesId(e.target.value)} required>
              {currentSeries.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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

          <FormField label="UPC">
            <input className="adminInput" value={upc} onChange={e => setUpc(e.target.value)} placeholder="0-12345-67890-1" />
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

      {isEdit && (
        <aside className={styles.coverPanel}>
          <p className={styles.coverLabel}>Cover image</p>
          <div className={`${styles.coverFrame} ${coverLoading ? styles.coverLoading : ''}`}>
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt="Cover"
                fill
                sizes="220px"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div className={styles.coverPlaceholder}>No cover</div>
            )}
            {coverLoading && <div className={styles.coverSpinner} />}
          </div>
          <div className={styles.coverActions}>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
              disabled={coverLoading}
            >
              {coverUrl ? 'Replace cover' : 'Upload cover'}
            </button>
            {coverUrl && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={handleCoverDelete}
                disabled={coverLoading}
              >
                Remove
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) handleCoverUpload(f)
              e.target.value = ''
            }}
          />
        </aside>
      )}
    </div>
  )
}
