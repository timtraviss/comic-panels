# Admin Filter, Layout Fix, Cover Lightbox — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add publisher/series/issue/title filter to Admin/Issues, fix horizontal page overflow on issue detail, and add a click-to-fullscreen cover lightbox.

**Architecture:** Three independent changes. Filter logic is extracted as a tested pure function used inside the existing client component. The layout overflow is a one-line CSS fix. The lightbox is a new co-located client component that wraps Cover with a portal-based overlay.

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS Modules, Vitest + @testing-library/react (unit), Playwright (E2E)

---

## File Map

| Action | File |
|--------|------|
| Modify | `app/issue/[id]/page.module.css` |
| Create | `lib/filter-issues.ts` |
| Create | `tests/unit/filter-issues.test.ts` |
| Modify | `app/admin/(main)/issues/IssuesTable.tsx` |
| Modify | `app/admin/(main)/issues/IssuesTable.module.css` |
| Create | `app/issue/[id]/CoverLightbox.tsx` |
| Create | `app/issue/[id]/CoverLightbox.module.css` |
| Create | `app/issue/[id]/CoverLightbox.test.tsx` |
| Modify | `app/issue/[id]/page.tsx` |

---

## Task 1: Fix issue page horizontal overflow

**Files:**
- Modify: `app/issue/[id]/page.module.css:11`

The `.detail` column in the CSS grid has no `min-width: 0`. CSS grid items default to `min-width: auto`, so the `IssueStrip` (an unbounded horizontal grid inside `.detail`) expands the column beyond the viewport.

- [ ] **Step 1: Apply the fix**

In `app/issue/[id]/page.module.css`, change line 11 from:
```css
.detail { display: flex; flex-direction: column; gap: 24px; }
```
to:
```css
.detail { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
```

- [ ] **Step 2: Verify manually**

Run the dev server:
```bash
npm run dev
```
Navigate to `http://localhost:3000/issue/vertigo-losers-8`. Confirm no horizontal scrollbar appears.

- [ ] **Step 3: Commit**

```bash
git add app/issue/[id]/page.module.css
git commit -m "fix: prevent issue strip from overflowing page width"
```

---

## Task 2: Extract and test `filterIssues` pure function

**Files:**
- Create: `lib/filter-issues.ts`
- Create: `tests/unit/filter-issues.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/unit/filter-issues.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { filterIssues, IssueFilters } from '@/lib/filter-issues'

const issues = [
  { id: '1', number: 1, title: 'The Beginning', series: { name: 'Saga', publisher: { name: 'Image' } } },
  { id: '2', number: 2, title: 'On the Road', series: { name: 'Saga', publisher: { name: 'Image' } } },
  { id: '3', number: 1, title: null, series: { name: 'Batman', publisher: { name: 'DC' } } },
]

const empty: IssueFilters = { publisher: '', series: '', issueNum: '', title: '' }

describe('filterIssues', () => {
  it('returns all issues when all filters are empty', () => {
    expect(filterIssues(issues, empty)).toHaveLength(3)
  })

  it('filters by publisher', () => {
    const result = filterIssues(issues, { ...empty, publisher: 'DC' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  it('filters by series', () => {
    const result = filterIssues(issues, { ...empty, series: 'Saga' })
    expect(result).toHaveLength(2)
  })

  it('filters by issue number (exact match)', () => {
    const result = filterIssues(issues, { ...empty, issueNum: '1' })
    expect(result).toHaveLength(2)
    expect(result.map(i => i.id)).toEqual(['1', '3'])
  })

  it('filters by title — case-insensitive substring', () => {
    const result = filterIssues(issues, { ...empty, title: 'BEGINNING' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('excludes null-title issues when title filter is active', () => {
    const result = filterIssues(issues, { ...empty, title: 'anything' })
    expect(result.every(i => i.title !== null)).toBe(true)
  })

  it('applies all four filters simultaneously', () => {
    const result = filterIssues(issues, { publisher: 'Image', series: 'Saga', issueNum: '1', title: 'beginning' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})
```

- [ ] **Step 2: Run and confirm the tests fail**

```bash
cd panels && npx vitest run tests/unit/filter-issues.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/filter-issues'`

- [ ] **Step 3: Create the implementation**

Create `lib/filter-issues.ts`:
```typescript
export interface IssueFilters {
  publisher: string
  series: string
  issueNum: string
  title: string
}

interface FilterableIssue {
  number: number | null
  title: string | null
  series: {
    name: string
    publisher: { name: string }
  }
}

export function filterIssues<T extends FilterableIssue>(issues: T[], filters: IssueFilters): T[] {
  const { publisher, series, issueNum, title } = filters
  return issues.filter(i => {
    if (publisher && i.series.publisher.name !== publisher) return false
    if (series && i.series.name !== series) return false
    if (issueNum !== '' && i.number !== Number(issueNum)) return false
    if (title && !i.title?.toLowerCase().includes(title.toLowerCase())) return false
    return true
  })
}
```

- [ ] **Step 4: Run and confirm all tests pass**

```bash
npx vitest run tests/unit/filter-issues.test.ts
```
Expected: 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add lib/filter-issues.ts tests/unit/filter-issues.test.ts
git commit -m "feat: add filterIssues pure function with unit tests"
```

---

## Task 3: Admin issues filter UI

**Files:**
- Modify: `app/admin/(main)/issues/IssuesTable.tsx`
- Modify: `app/admin/(main)/issues/IssuesTable.module.css`

- [ ] **Step 1: Update `IssuesTable.tsx`**

Replace the entire file with:
```typescript
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
    () => [...new Set(issues.map(i => i.series.publisher.name))].sort(),
    [issues]
  )

  const seriesOptions = useMemo(
    () => [...new Set(
      issues
        .filter(i => !filters.publisher || i.series.publisher.name === filters.publisher)
        .map(i => i.series.name)
    )].sort(),
    [issues, filters.publisher]
  )

  const filteredIssues = useMemo(() => filterIssues(issues, filters), [issues, filters])

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
          className={`adminInput ${styles.filterControl}`}
          value={filters.publisher}
          onChange={e => setFilters(f => ({ ...f, publisher: e.target.value, series: '' }))}
          aria-label="Filter by publisher"
        >
          <option value="">All publishers</option>
          {publisherOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          className={`adminInput ${styles.filterControl}`}
          value={filters.series}
          onChange={e => setFilters(f => ({ ...f, series: e.target.value }))}
          aria-label="Filter by series"
        >
          <option value="">All series</option>
          {seriesOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="number"
          className={`adminInput ${styles.filterControl} ${styles.filterNum}`}
          placeholder="Issue #"
          value={filters.issueNum}
          onChange={e => setFilters(f => ({ ...f, issueNum: e.target.value }))}
          aria-label="Filter by issue number"
          min="1"
        />
        <input
          type="text"
          className={`adminInput ${styles.filterControl}`}
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
```

- [ ] **Step 2: Add filter bar styles to `IssuesTable.module.css`**

Append to the end of the existing file:
```css
.filterBar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.25rem;
}

.filterControl {
  width: auto !important;
  min-width: 140px;
}

.filterNum {
  min-width: 88px;
  max-width: 100px;
}

.clearBtn {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-sub);
  font-size: 0.875rem;
  padding: 0.4rem 0.875rem;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-body);
}

.clearBtn:hover {
  border-color: var(--text-sub);
  color: var(--text);
}

.resultCount {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: -0.75rem 0 1rem;
}
```

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:3000/admin/issues` (log in first). Confirm:
- Four controls render in a row
- Selecting a publisher filters the series dropdown to that publisher's series
- Clearing publisher resets series to "All series"
- Issue # and title inputs filter live as you type
- "Showing X of 399" appears when any filter is active
- Clear button resets all controls

- [ ] **Step 4: Commit**

```bash
git add app/admin/(main)/issues/IssuesTable.tsx app/admin/(main)/issues/IssuesTable.module.css
git commit -m "feat: add publisher/series/issue/title filter to admin issues table"
```

---

## Task 4: Create CoverLightbox component

**Files:**
- Create: `app/issue/[id]/CoverLightbox.test.tsx`
- Create: `app/issue/[id]/CoverLightbox.tsx`
- Create: `app/issue/[id]/CoverLightbox.module.css`

- [ ] **Step 1: Write the failing tests**

Create `app/issue/[id]/CoverLightbox.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CoverLightbox from './CoverLightbox'

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string; [key: string]: unknown }) => <img alt={alt} />,
}))

vi.mock('@/app/_components/Cover/Cover', () => ({
  default: ({ alt }: { alt: string }) => <div data-testid="cover">{alt}</div>,
}))

const withCover = { coverImage: 'https://example.com/cover.jpg', alt: 'Saga #1' }

describe('CoverLightbox', () => {
  it('renders a button with accessible label when coverImage is provided', () => {
    render(<CoverLightbox {...withCover} />)
    expect(screen.getByRole('button', { name: 'View cover: Saga #1' })).toBeInTheDocument()
  })

  it('opens the overlay on click', () => {
    render(<CoverLightbox {...withCover} />)
    fireEvent.click(screen.getByRole('button', { name: 'View cover: Saga #1' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes the overlay when Escape is pressed', () => {
    render(<CoverLightbox {...withCover} />)
    fireEvent.click(screen.getByRole('button', { name: 'View cover: Saga #1' }))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the overlay when the overlay is clicked', () => {
    render(<CoverLightbox {...withCover} />)
    fireEvent.click(screen.getByRole('button', { name: 'View cover: Saga #1' }))
    fireEvent.click(screen.getByRole('dialog'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders Cover directly (no button) when coverImage is null', () => {
    render(<CoverLightbox coverImage={null} alt="Placeholder" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByTestId('cover')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and confirm tests fail**

```bash
npx vitest run app/issue/[id]/CoverLightbox.test.tsx
```
Expected: FAIL — `Cannot find module './CoverLightbox'`

- [ ] **Step 3: Create the component**

Create `app/issue/[id]/CoverLightbox.tsx`:
```tsx
'use client'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Cover from '@/app/_components/Cover/Cover'
import styles from './CoverLightbox.module.css'

interface CoverLightboxProps {
  coverImage: string | null
  alt: string
  paletteBg?: string | null
  paletteAccent?: string | null
}

export default function CoverLightbox({ coverImage, alt, paletteBg, paletteAccent }: CoverLightboxProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!coverImage) {
    return (
      <Cover
        coverImage={null}
        alt={alt}
        paletteBg={paletteBg}
        paletteAccent={paletteAccent}
        size="lg"
        priority
      />
    )
  }

  const src = coverImage.startsWith('https://') ? coverImage : `/covers/${coverImage}`

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label={`View cover: ${alt}`}
      >
        <Cover
          coverImage={coverImage}
          alt={alt}
          paletteBg={paletteBg}
          paletteAccent={paletteAccent}
          size="lg"
          priority
        />
      </button>

      {mounted && open && createPortal(
        <div
          className={styles.overlay}
          onClick={close}
          role="dialog"
          aria-label="Cover image"
          aria-modal="true"
        >
          <div className={styles.imageWrap}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
```

- [ ] **Step 4: Create the styles**

Create `app/issue/[id]/CoverLightbox.module.css`:
```css
.trigger {
  background: none;
  border: none;
  padding: 0;
  display: block;
  width: fit-content;
  cursor: zoom-in;
}

.trigger:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 4px;
  border-radius: 2px;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s ease;
  cursor: zoom-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.imageWrap {
  position: relative;
  width: min(90vw, calc(90vh * 2 / 3));
  height: min(90vh, calc(90vw * 3 / 2));
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .overlay { animation: none; }
}
```

- [ ] **Step 5: Run tests and confirm they pass**

```bash
npx vitest run app/issue/[id]/CoverLightbox.test.tsx
```
Expected: 5 tests PASS

- [ ] **Step 6: Commit**

```bash
git add "app/issue/[id]/CoverLightbox.tsx" "app/issue/[id]/CoverLightbox.module.css" "app/issue/[id]/CoverLightbox.test.tsx"
git commit -m "feat: add CoverLightbox component with overlay and tests"
```

---

## Task 5: Wire CoverLightbox into the issue page

**Files:**
- Modify: `app/issue/[id]/page.tsx`

- [ ] **Step 1: Update `page.tsx` imports**

In `app/issue/[id]/page.tsx`, replace:
```tsx
import Cover from '@/app/_components/Cover/Cover'
```
with:
```tsx
import CoverLightbox from './CoverLightbox'
```

- [ ] **Step 2: Replace the Cover component in the sidebar**

In `app/issue/[id]/page.tsx`, replace:
```tsx
<Cover
  coverImage={issue.coverImage}
  alt={`${series.name} #${issue.number}`}
  paletteBg={series.paletteBg}
  paletteAccent={series.paletteAccent}
  size="lg"
  priority
/>
```
with:
```tsx
<CoverLightbox
  coverImage={issue.coverImage}
  alt={`${series.name} #${issue.number}`}
  paletteBg={series.paletteBg}
  paletteAccent={series.paletteAccent}
/>
```

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:3000/issue/vertigo-losers-8`. Confirm:
- The cover renders as before
- Hovering the cover shows `zoom-in` cursor
- Clicking the cover opens the dark overlay with the cover filling most of the viewport
- Pressing Escape dismisses the overlay
- Clicking the dark area dismisses the overlay
- On an issue without a cover (placeholder), no cursor change and no click interaction

- [ ] **Step 4: Run the full test suite**

```bash
npx vitest run
```
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add "app/issue/[id]/page.tsx"
git commit -m "feat: wire CoverLightbox into issue detail page"
```

---

## Task 6: Deploy

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

The VPS pulls from GitHub. SSH in and deploy:

```bash
ssh root@187.77.130.76 "source ~/.nvm/nvm.sh && cd /var/www/panels && git pull origin main && npm run build && pm2 restart panels"
```

- [ ] **Step 2: Smoke-test production**

- Visit `https://panels.trav-a-matic.tech/issue/vertigo-losers-8` — no horizontal scroll
- Visit `https://panels.trav-a-matic.tech/admin/issues` — filter bar present, filtering works
- Click a cover with an image — lightbox opens and closes
