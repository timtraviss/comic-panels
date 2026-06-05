'use client'
import { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { filterIssues, IssueFilters } from '@/lib/filter-issues'
import styles from './IssuesTable.module.css'

interface Issue {
  id: string
  number: number | null
  title: string | null
  coverImage: string | null
  series: {
    name: string
    publisher: { name: string }
  }
}

export default function IssuesTable({ issues }: { issues: Issue[] }) {
  const [covers, setCovers] = useState<Record<string, string | null>>(
    Object.fromEntries(issues.map(i => [i.id, i.coverImage]))
  )
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [filters, setFilters] = useState<IssueFilters>({ publisher: '', series: '', issueNum: '', title: '' })

  const publisherOptions = useMemo(
    () => Array.from(new Set(issues.map(i => i.series.publisher.name))).sort(),
    [issues]
  )

  const seriesOptions = useMemo(
    () => Array.from(new Set(
      issues
        .filter(i => !filters.publisher || i.series.publisher.name === filters.publisher)
        .map(i => i.series.name)
    )).sort(),
    [issues, filters.publisher]
  )

  const filteredIssues = useMemo(
    () => filterIssues(issues, filters),
    [issues, filters.publisher, filters.series, filters.issueNum, filters.title]
  )

  const isFiltered = !!(filters.publisher || filters.series || filters.issueNum || filters.title)

  function clearFilters() {
    setFilters({ publisher: '', series: '', issueNum: '', title: '' })
  }

  async function handleUpload(issueId: string, file: File) {
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
      if (!res.ok) { alert('Delete failed.'); return }
      setCovers(prev => ({ ...prev, [issueId]: null }))
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [issueId]: false }))
    }
  }

  if (issues.length === 0) return <p className={styles.empty}>No issues yet.</p>

  return (
    <div>
      <div className={styles.filterBar}>
        <select
          className={styles.filterControl}
          value={filters.publisher}
          onChange={e => setFilters(f => ({ ...f, publisher: e.target.value, series: '' }))}
          aria-label="Filter by publisher"
        >
          <option value="">All publishers</option>
          {publisherOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          className={styles.filterControl}
          value={filters.series}
          onChange={e => setFilters(f => ({ ...f, series: e.target.value }))}
          aria-label="Filter by series"
        >
          <option value="">All series</option>
          {seriesOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="number"
          className={`${styles.filterControl} ${styles.filterNum}`}
          placeholder="Issue #"
          value={filters.issueNum}
          onChange={e => setFilters(f => ({ ...f, issueNum: e.target.value }))}
          aria-label="Filter by issue number"
          min="1"
        />
        <input
          type="text"
          className={styles.filterControl}
          placeholder="Search title…"
          value={filters.title}
          onChange={e => setFilters(f => ({ ...f, title: e.target.value }))}
          aria-label="Search by title"
        />
        {isFiltered && (
          <button type="button" className={styles.clearBtn} onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      {isFiltered && (
        <p className={styles.resultCount}>Showing {filteredIssues.length} of {issues.length}</p>
      )}

      {filteredIssues.length === 0 ? (
        <p className={styles.empty}>No issues match these filters.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.coverCol}>Cover</th>
              <th>Publisher</th>
              <th>Series</th>
              <th className={styles.numCol}>#</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map(i => {
              const coverUrl = covers[i.id]
              const isLoading = loading[i.id]
              return (
                <tr key={i.id}>
                  <td className={styles.coverCell}>
                    <div className={`${styles.thumb} ${isLoading ? styles.loading : ''}`}>
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={`${i.series.name} #${i.number ?? '?'}`}
                          fill
                          sizes="48px"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className={styles.placeholder} />
                      )}
                      {isLoading && <div className={styles.spinner} />}
                      {!isLoading && (
                        <div className={styles.overlay}>
                          <button
                            type="button"
                            className={styles.overlayBtn}
                            onClick={() => inputRefs.current[i.id]?.click()}
                            title={coverUrl ? 'Replace cover' : 'Upload cover'}
                          >
                            {coverUrl ? '↑' : '+'}
                          </button>
                          {coverUrl && (
                            <button
                              type="button"
                              className={`${styles.overlayBtn} ${styles.deleteBtn}`}
                              onClick={() => handleDelete(i.id)}
                              title="Remove cover"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <input
                      ref={el => { inputRefs.current[i.id] = el }}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const f = e.target.files?.[0]
                        if (f) handleUpload(i.id, f)
                        e.target.value = ''
                      }}
                    />
                  </td>
                  <td className={styles.muted}>{i.series.publisher.name}</td>
                  <td>{i.series.name}</td>
                  <td className={styles.num}>{i.number}</td>
                  <td className={styles.muted}>{i.title ?? '—'}</td>
                  <td><Link href={`/admin/issues/${i.id}/edit`} className={styles.editLink}>Edit</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
