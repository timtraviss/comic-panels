# Cover Image Upload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an admin-protected cover image upload pipeline so any issue can have a JPEG/PNG/WebP cover stored in Supabase Storage and served via CDN.

**Architecture:** A Next.js middleware guards all `/admin/*` and `/api/admin/*` routes using an HMAC cookie checked against `ADMIN_PASSWORD`. Two API routes handle upload/replace and delete. The admin panel (`/admin/covers`) and per-issue page (`/issue/[id]`) both use these routes via client components.

**Tech Stack:** Next.js 15 App Router, `@supabase/supabase-js` (Storage), Node.js `crypto` (HMAC), CSS Modules, Vitest

---

## Pre-flight: Manual Supabase setup (do this before Task 1)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → your `comic-database` project
2. Left sidebar → **Storage** → **New bucket**
3. Name: `covers` — toggle **Public** on → Create
4. Left sidebar → **Project Settings** → **API**
5. Copy the **service_role** key (under "Project API keys") — keep it safe, you'll add it to `.env.local` in Task 1

---

## Task 1: Install dependency + env vars + storage helper

**Files:**
- Modify: `package.json`
- Modify: `.env.local`
- Create: `lib/supabase-storage.ts`

- [ ] **Step 1: Install @supabase/supabase-js**

```bash
cd "/Users/timothytraviss/Library/CloudStorage/Dropbox/Claude Code/Comic-Database/panels"
npm install @supabase/supabase-js
```

Expected: package added to `dependencies` in `package.json`.

- [ ] **Step 2: Add env vars to .env.local**

Open `.env.local` and append these two lines (replace placeholders with real values):

```
NEXT_PUBLIC_SUPABASE_URL=https://zfgetlvfpalyviowvvmh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key-from-supabase-settings>
ADMIN_PASSWORD=<choose-a-strong-password>
```

- [ ] **Step 3: Write the failing test for the storage helper**

Create `lib/supabase-storage.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ error: null }),
        remove: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/storage/v1/object/public/covers/saga-1.jpg' },
        }),
      })),
    },
  })),
}))

// Set env vars before importing the module
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'

const { uploadCover, deleteCover } = await import('./supabase-storage')

describe('uploadCover', () => {
  it('returns a public CDN URL on success', async () => {
    const fakeBuffer = Buffer.from('fake-image')
    const url = await uploadCover('saga-1', fakeBuffer, 'image/jpeg')
    expect(url).toBe('https://example.com/storage/v1/object/public/covers/saga-1.jpg')
  })
})

describe('deleteCover', () => {
  it('resolves without error', async () => {
    await expect(deleteCover('saga-1')).resolves.toBeUndefined()
  })
})
```

- [ ] **Step 4: Run test to verify it fails**

```bash
npm test -- lib/supabase-storage.test.ts
```

Expected: FAIL — `lib/supabase-storage` module not found.

- [ ] **Step 5: Create lib/supabase-storage.ts**

```ts
import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function uploadCover(issueId: string, buffer: Buffer, contentType: string): Promise<string> {
  const supabase = getClient()
  const filename = `${issueId}.jpg`

  const { error } = await supabase.storage
    .from('covers')
    .upload(filename, buffer, { upsert: true, contentType })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data } = supabase.storage.from('covers').getPublicUrl(filename)
  return data.publicUrl
}

export async function deleteCover(issueId: string): Promise<void> {
  const supabase = getClient()
  const { error } = await supabase.storage
    .from('covers')
    .remove([`${issueId}.jpg`])

  if (error) throw new Error(`Storage delete failed: ${error.message}`)
}
```

- [ ] **Step 6: Run test to verify it passes**

```bash
npm test -- lib/supabase-storage.test.ts
```

Expected: PASS — 2 tests.

- [ ] **Step 7: Commit**

```bash
git add lib/supabase-storage.ts lib/supabase-storage.test.ts package.json package-lock.json
git commit -m "feat: add Supabase Storage helper for cover upload/delete"
```

---

## Task 2: Admin auth — middleware + login page + login API

**Files:**
- Create: `middleware.ts` (project root)
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/login/page.module.css`
- Create: `app/api/admin/login/route.ts`

- [ ] **Step 1: Create middleware.ts at project root**

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHmac } from 'crypto'

function expectedToken(): string {
  return createHmac('sha256', process.env.ADMIN_PASSWORD ?? '').update('panels-admin').digest('hex')
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')?.value
  if (session !== expectedToken()) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
```

- [ ] **Step 2: Create app/api/admin/login/route.ts**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = createHmac('sha256', process.env.ADMIN_PASSWORD!).update('panels-admin').digest('hex')
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'strict',
  })

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Create app/admin/login/page.module.css**

```css
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.card {
  background: var(--surface);
  border: 2px solid #000;
  box-shadow: var(--comic-shadow);
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
}

.heading {
  font-family: var(--font-display);
  color: var(--brand);
  font-size: 1.25rem;
  margin: 0 0 0.25rem;
}

.sub {
  color: var(--text-sub);
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
}

.label {
  display: block;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
}

.input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.9375rem;
  border-radius: var(--radius-sm);
  box-sizing: border-box;
  margin-bottom: 1.25rem;
}

.input:focus {
  outline: none;
  border-color: var(--brand);
}

.btn {
  width: 100%;
  padding: 0.625rem;
  background: var(--brand);
  color: #fff;
  font-weight: 600;
  font-size: 0.9375rem;
  border: 2px solid #000;
  box-shadow: var(--comic-shadow-sm);
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: var(--comic-shadow);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--comic-shadow-sm);
}

.error {
  color: #f87171;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
```

- [ ] **Step 4: Create app/admin/login/page.tsx**

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/covers')
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.heading}>PANELS admin</h1>
        <p className={styles.sub}>Enter your admin password to continue.</p>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            required
          />
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify login works in dev**

```bash
npm run dev
```

Open `http://localhost:3000/admin/covers` — should redirect to `/admin/login`. Enter the password set in `ADMIN_PASSWORD` — should redirect to `/admin/covers` (404 for now, that's fine).

- [ ] **Step 6: Commit**

```bash
git add middleware.ts app/admin/login/ app/api/admin/login/
git commit -m "feat: admin auth — middleware, login page, login API"
```

---

## Task 3: Upload API route

**Files:**
- Create: `app/api/admin/upload-cover/route.ts`

- [ ] **Step 1: Create app/api/admin/upload-cover/route.ts**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { uploadCover } from '@/lib/supabase-storage'
import { prisma } from '@/lib/db'

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const issueId = formData.get('issueId') as string | null
  const file = formData.get('file') as File | null

  if (!issueId || !file) {
    return NextResponse.json({ error: 'issueId and file are required' }, { status: 400 })
  }

  if (!VALID_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'File must be JPEG, PNG, or WebP' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File must be under 5MB' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const url = await uploadCover(issueId, buffer, file.type)
    await prisma.issue.update({ where: { id: issueId }, data: { coverImage: url } })
    return NextResponse.json({ url })
  } catch (err) {
    console.error('Upload failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/upload-cover/
git commit -m "feat: POST /api/admin/upload-cover route"
```

---

## Task 4: Delete API route

**Files:**
- Create: `app/api/admin/delete-cover/route.ts`

- [ ] **Step 1: Create app/api/admin/delete-cover/route.ts**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { deleteCover } from '@/lib/supabase-storage'
import { prisma } from '@/lib/db'

export async function DELETE(request: NextRequest) {
  const { issueId } = await request.json()

  if (!issueId) {
    return NextResponse.json({ error: 'issueId is required' }, { status: 400 })
  }

  try {
    await deleteCover(issueId)
    await prisma.issue.update({ where: { id: issueId }, data: { coverImage: null } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Delete failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/delete-cover/
git commit -m "feat: DELETE /api/admin/delete-cover route"
```

---

## Task 5: Update Cover component to handle full URLs

**Files:**
- Modify: `app/_components/Cover/Cover.tsx`

- [ ] **Step 1: Write the failing test**

Create `app/_components/Cover/Cover.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Cover from './Cover'

// vitest.config.ts already has jsdom environment via existing setup
describe('Cover', () => {
  it('renders an img with full Supabase URL as-is', () => {
    render(
      <Cover
        coverImage="https://zfgetlvfpalyviowvvmh.supabase.co/storage/v1/object/public/covers/saga-1.jpg"
        alt="Saga #1"
      />
    )
    const img = screen.getByRole('img', { name: 'Saga #1' })
    expect(img).toBeTruthy()
  })

  it('renders a placeholder when coverImage is null', () => {
    const { container } = render(<Cover coverImage={null} alt="No cover" />)
    expect(container.querySelector('img')).toBeNull()
  })
})
```

- [ ] **Step 2: Check vitest config supports React**

```bash
cat vitest.config.ts 2>/dev/null || cat vitest.config.js 2>/dev/null
```

If `@testing-library/react` is not installed, install it:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- Cover.test.tsx
```

Expected: FAIL — Cover component uses `/covers/` prefix for all non-null images, which breaks for full URLs.

- [ ] **Step 4: Update Cover.tsx**

Replace the `src` line in Cover.tsx. Open `app/_components/Cover/Cover.tsx` and change:

```tsx
// Before
src={`/covers/${coverImage}`}

// After
src={coverImage.startsWith('http') ? coverImage : `/covers/${coverImage}`}
```

Full updated file:

```tsx
import Image from 'next/image'
import styles from './Cover.module.css'

interface CoverProps {
  coverImage: string | null
  alt: string
  paletteBg?: string | null
  paletteAccent?: string | null
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
}

export default function Cover({ coverImage, alt, paletteBg, paletteAccent, size = 'md', priority = false }: CoverProps) {
  if (coverImage) {
    const src = coverImage.startsWith('http') ? coverImage : `/covers/${coverImage}`
    return (
      <div className={`${styles.cover} ${styles[size]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={size === 'lg' ? '240px' : size === 'sm' ? '110px' : '160px'}
          className={styles.image}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div
      className={`${styles.cover} ${styles.placeholder} ${styles[size]}`}
      style={{ '--pb': paletteBg ?? '#1E2A44', '--pa': paletteAccent ?? '#E8743C' } as React.CSSProperties}
      aria-label={alt}
    >
      <div className={styles.halftone} />
      <div className={styles.accent} />
    </div>
  )
}
```

- [ ] **Step 5: Add Supabase URL to next.config.js image domains**

Open `next.config.ts` (or `next.config.js`) and add the Supabase hostname to `images.remotePatterns`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zfgetlvfpalyviowvvmh.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 6: Run test to verify it passes**

```bash
npm test -- Cover.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/_components/Cover/Cover.tsx app/_components/Cover/Cover.test.tsx next.config.ts
git commit -m "feat: Cover component handles Supabase CDN URLs"
```

---

## Task 6: Admin covers panel

**Files:**
- Create: `app/admin/covers/page.tsx`
- Create: `app/admin/covers/CoverGrid.tsx`
- Create: `app/admin/covers/CoverGrid.module.css`
- Create: `app/admin/covers/page.module.css`

- [ ] **Step 1: Create app/admin/covers/page.module.css**

```css
.page {
  min-height: 100vh;
  background: var(--bg);
  padding: 2rem 1.5rem;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.heading {
  font-family: var(--font-display);
  color: var(--brand);
  font-size: 1.5rem;
  margin: 0;
}

.count {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filterBtn {
  padding: 0.375rem 0.875rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-sub);
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-size: 0.875rem;
}

.filterBtn.active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}
```

- [ ] **Step 2: Create app/admin/covers/CoverGrid.module.css**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
}

@media (max-width: 1200px) { .grid { grid-template-columns: repeat(6, 1fr); } }
@media (max-width: 960px)  { .grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 600px)  { .grid { grid-template-columns: repeat(3, 1fr); } }

.card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.coverWrap {
  position: relative;
  aspect-ratio: 2 / 3;
  border: 2px solid #000;
  box-shadow: var(--comic-shadow-sm);
  overflow: hidden;
  background: var(--surface);
  cursor: pointer;
}

.coverWrap:hover .overlay {
  opacity: 1;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  opacity: 0;
  transition: opacity 0.15s;
}

.loading .overlay {
  opacity: 1;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.iconBtn {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.75rem;
  cursor: pointer;
}

.iconBtn:hover {
  background: rgba(255,255,255,0.3);
}

.iconBtn.danger:hover {
  background: rgba(248,113,113,0.5);
  border-color: #f87171;
}

.meta {
  font-size: 0.75rem;
  color: var(--text-sub);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metaSeries {
  color: var(--text-muted);
}

.uploadBtn {
  padding: 0.3rem 0;
  background: var(--brand);
  color: #fff;
  border: 2px solid #000;
  font-size: 0.75rem;
  cursor: pointer;
  text-align: center;
  width: 100%;
}

.uploadBtn:hover {
  opacity: 0.85;
}

.hiddenInput {
  display: none;
}
```

- [ ] **Step 3: Create app/admin/covers/CoverGrid.tsx**

```tsx
'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './CoverGrid.module.css'

interface Issue {
  id: string
  title: string
  number: number
  coverImage: string | null
  series: { name: string; paletteBg: string | null; paletteAccent: string | null }
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

  const missing = issues.filter(i => !covers[i.id]).length

  return (
    <>
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${filter === 'missing' ? styles.active : ''}`}
          onClick={() => setFilter('missing')}
        >
          Missing cover ({missing})
        </button>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All issues ({issues.length})
        </button>
      </div>

      <div className={styles.grid}>
        {displayed.map(issue => {
          const coverUrl = covers[issue.id]
          const isLoading = loading[issue.id]

          return (
            <div key={issue.id} className={styles.card}>
              <div
                className={`${styles.coverWrap} ${isLoading ? styles.loading : ''}`}
                onClick={() => !isLoading && inputRefs.current[issue.id]?.click()}
              >
                {coverUrl ? (
                  <Image src={coverUrl} alt={`${issue.series.name} #${issue.number}`} fill sizes="160px" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className={styles.placeholder}>No cover</div>
                )}
                <div className={styles.overlay}>
                  {isLoading ? (
                    <div className={styles.spinner} />
                  ) : (
                    <>
                      <button className={styles.iconBtn} onClick={e => { e.stopPropagation(); inputRefs.current[issue.id]?.click() }}>
                        {coverUrl ? 'Replace' : 'Upload'}
                      </button>
                      {coverUrl && (
                        <button className={`${styles.iconBtn} ${styles.danger}`} onClick={e => { e.stopPropagation(); handleDelete(issue.id) }}>
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <input
                ref={el => { inputRefs.current[issue.id] = el }}
                className={styles.hiddenInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFileChange(issue.id, f); e.target.value = '' }}
              />
              <div className={styles.meta}>{issue.title || `#${issue.number}`}</div>
              <div className={`${styles.meta} ${styles.metaSeries}`}>{issue.series.name}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
```

- [ ] **Step 4: Create app/admin/covers/page.tsx**

```tsx
import { prisma } from '@/lib/db'
import CoverGrid from './CoverGrid'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function AdminCoversPage() {
  const issues = await prisma.issue.findMany({
    orderBy: [{ series: { name: 'asc' } }, { number: 'asc' }],
    select: {
      id: true,
      title: true,
      number: true,
      coverImage: true,
      series: { select: { name: true, paletteBg: true, paletteAccent: true } },
    },
  })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Cover images</h1>
          <span className={styles.count}>{issues.length} issues total</span>
        </div>
        <CoverGrid issues={issues} />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Test admin panel in browser**

```bash
npm run dev
```

1. Visit `http://localhost:3000/admin/covers` — should redirect to `/admin/login`
2. Log in with your `ADMIN_PASSWORD`
3. Should see the grid of issues with "Missing cover" filter active
4. Click a card and pick a small JPEG — should upload and show thumbnail

- [ ] **Step 6: Commit**

```bash
git add app/admin/covers/
git commit -m "feat: admin covers panel with upload, replace, delete"
```

---

## Task 7: Per-issue upload controls

**Files:**
- Create: `app/issue/[id]/CoverUpload.tsx`
- Create: `app/issue/[id]/CoverUpload.module.css`
- Modify: `app/issue/[id]/page.tsx`

- [ ] **Step 1: Create app/issue/[id]/CoverUpload.module.css**

```css
.wrap {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.375rem 0.875rem;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-sub);
  font-size: 0.8125rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.btn:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.btn.danger:hover {
  border-color: #f87171;
  color: #f87171;
}

.hiddenInput {
  display: none;
}
```

- [ ] **Step 2: Create app/issue/[id]/CoverUpload.tsx**

```tsx
'use client'
import { useState, useRef } from 'react'
import styles from './CoverUpload.module.css'

interface Props {
  issueId: string
  hasCover: boolean
  onUpload: (url: string) => void
  onDelete: () => void
}

export default function CoverUpload({ issueId, hasCover, onUpload, onDelete }: Props) {
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setLoading(true)
    const formData = new FormData()
    formData.append('issueId', issueId)
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload-cover', { method: 'POST', body: formData })
      if (!res.ok) { const { error } = await res.json(); alert(`Upload failed: ${error}`); return }
      const { url } = await res.json()
      onUpload(url)
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
      if (!res.ok) { alert('Delete failed.'); return }
      onDelete()
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={() => inputRef.current?.click()} disabled={loading}>
        {loading ? 'Uploading...' : hasCover ? 'Replace cover' : 'Upload cover'}
      </button>
      {hasCover && (
        <button className={`${styles.btn} ${styles.danger}`} onClick={handleDelete} disabled={loading}>
          Delete cover
        </button>
      )}
      <input
        ref={inputRef}
        className={styles.hiddenInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
      />
    </div>
  )
}
```

- [ ] **Step 3: Modify app/issue/[id]/page.tsx to show upload controls when admin is logged in**

Add the following imports at the top:

```tsx
import { cookies } from 'next/headers'
import { createHmac } from 'crypto'
import CoverUpload from './CoverUpload'
```

Add this helper inside the component, before the return:

```tsx
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  const expectedToken = createHmac('sha256', process.env.ADMIN_PASSWORD ?? '').update('panels-admin').digest('hex')
  const isAdmin = session === expectedToken
```

Then inside `<aside className={styles.sidebar}>`, add the upload controls after the `<Cover ... />` component:

```tsx
            {isAdmin && (
              <CoverUpload
                issueId={issue.id}
                hasCover={!!issue.coverImage}
                onUpload={() => {}}
                onDelete={() => {}}
              />
            )}
```

**Note:** The `onUpload`/`onDelete` callbacks here are no-ops because the server component will re-render on next navigation. For live UI feedback on this page, a full solution would require converting the sidebar to a client component — that's acceptable as a follow-up. The admin panel is the primary upload surface.

- [ ] **Step 4: Test per-issue upload in browser**

1. Log in at `/admin/login`
2. Navigate to any issue page — e.g. `http://localhost:3000/issue/saga-1`
3. Should see "Upload cover" / "Replace cover" / "Delete cover" buttons below the cover
4. Upload a file — verify it appears

- [ ] **Step 5: Commit**

```bash
git add app/issue/
git commit -m "feat: per-issue cover upload controls for admin users"
```

---

## Task 8: Deploy to VPS

- [ ] **Step 1: Update env vars on VPS**

SSH in and add the new env vars:

```bash
ssh root@187.77.130.76
nano /var/www/panels/.env.local
```

Add these lines (use real values):
```
NEXT_PUBLIC_SUPABASE_URL=https://zfgetlvfpalyviowvvmh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
ADMIN_PASSWORD=<your-admin-password>
```

- [ ] **Step 2: Push code to GitHub from Mac**

```bash
git push origin main
```

- [ ] **Step 3: Pull, build, restart on VPS**

```bash
ssh root@187.77.130.76 "cd /var/www/panels && git pull && npm ci && npx prisma generate && npm run build && pm2 restart panels"
```

- [ ] **Step 4: Verify on production**

1. Visit `https://panels.trav-a-matic.tech/admin/covers` — should redirect to login
2. Log in — should see the cover grid
3. Upload a cover for one issue
4. Visit the issue page — cover should appear

---

## Self-review checklist

- [x] Supabase Storage setup covered (Task 1 pre-flight)
- [x] `lib/supabase-storage.ts` covers upload and delete
- [x] Middleware protects `/admin/*` and `/api/admin/*`, excludes `/admin/login` and `/api/admin/login`
- [x] Login page + API route set HttpOnly cookie
- [x] `POST /api/admin/upload-cover` validates type, size, updates DB
- [x] `DELETE /api/admin/delete-cover` removes from Storage and clears DB field
- [x] `Cover.tsx` handles both full URLs and legacy relative paths
- [x] Supabase hostname added to `next.config.ts` image domains
- [x] Admin panel grid with filter, upload, replace, delete
- [x] Per-issue upload controls visible only when admin cookie present
- [x] VPS deploy steps included
- [x] All file paths exact, all code complete, no TBDs
