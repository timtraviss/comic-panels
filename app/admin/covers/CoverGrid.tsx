'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './CoverGrid.module.css'

interface Issue {
  id: string
  title: string
  number: number | null
  coverImage: string | null
  series: { name: string }
}

interface Props {
  issues: Issue[]
}

export default function CoverGrid({ issues }: Props) {
  const [filter, setFilter] = useState<'missing' | 'all'>('missing')
  const [covers, setCovers] = useState<Record<string, string | null>>(
    Object.fromEntries(issues.map(i => [i.id, i.coverImage]))
  )
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const displayed = filter === 'missing'
    ? issues.filter(i => !covers[i.id])
    : issues

  const missing = issues.filter(i => !covers[i.id]).length

  async function handleFileChange(issueId: string, file: File) {
    setLoading(prev => ({ ...prev, [issueId]: true }))
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
      const { url } = await res.json()
      setCovers(prev => ({ ...prev, [issueId]: url }))
    } catch {
      alert('Upload failed. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [issueId]: false }))
    }
  }

  async function handleDelete(issueId: string) {
    if (!confirm('Remove this cover image?')) return
    setLoading(prev => ({ ...prev, [issueId]: true }))
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
      setCovers(prev => ({ ...prev, [issueId]: null }))
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [issueId]: false }))
    }
  }

  return (
    <>
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${filter === 'missing' ? styles.active : ''}`}
          onClick={() => setFilter('missing')}
          aria-pressed={filter === 'missing'}
        >
          Missing cover ({missing})
        </button>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
        >
          All issues ({issues.length})
        </button>
      </div>

      {displayed.length === 0 ? (
        <p className={styles.emptyState}>
          {filter === 'missing' ? 'All covers uploaded.' : 'No issues found.'}
        </p>
      ) : (
        <div className={styles.grid}>
          {displayed.map(issue => {
            const coverUrl = covers[issue.id]
            const isLoading = loading[issue.id]

            return (
              <div key={issue.id} className={styles.card}>
                <button
                  type="button"
                  className={`${styles.coverWrap} ${isLoading ? styles.loading : ''}`}
                  onClick={() => !isLoading && inputRefs.current[issue.id]?.click()}
                  disabled={isLoading}
                  aria-label={`${covers[issue.id] ? 'Replace' : 'Upload'} cover for ${issue.series.name} #${issue.number ?? '?'}`}
                >
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={`${issue.series.name} #${issue.number ?? '?'}`}
                      fill
                      sizes="160px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={styles.placeholder}>No cover</div>
                  )}
                  <div className={styles.overlay}>
                    {isLoading ? (
                      <div className={styles.spinner} />
                    ) : (
                      <>
                        <button
                          className={styles.iconBtn}
                          onClick={e => { e.stopPropagation(); inputRefs.current[issue.id]?.click() }}
                        >
                          {coverUrl ? 'Replace' : 'Upload'}
                        </button>
                        {coverUrl && (
                          <button
                            className={`${styles.iconBtn} ${styles.danger}`}
                            onClick={e => { e.stopPropagation(); handleDelete(issue.id) }}
                          >
                            Delete
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </button>
                <input
                  ref={el => { inputRefs.current[issue.id] = el }}
                  className={styles.hiddenInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={e => {
                    const f = e.target.files?.[0]
                    if (f) handleFileChange(issue.id, f)
                    e.target.value = ''
                  }}
                />
                <div className={styles.meta}>{issue.title || (issue.number != null ? `#${issue.number}` : '—')}</div>
                <div className={`${styles.meta} ${styles.metaSeries}`}>{issue.series.name}</div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
