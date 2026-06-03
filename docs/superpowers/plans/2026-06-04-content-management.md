# Content Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full CRUD admin UI for Publishers, Series, Issues, and Creators with a shared sidebar layout.

**Architecture:** A Next.js route group `app/admin/(main)/` wraps all protected admin pages in a shared sidebar layout. Each entity type has a list page, add page, and edit page (server components) paired with a client-side form component. API routes follow the existing `app/api/admin/` pattern with middleware-protected auth.

**Tech Stack:** Next.js 14 App Router, Prisma 7 + `@prisma/adapter-pg`, Supabase Postgres, CSS Modules, Vitest

---

## File map

```
prisma/schema.prisma                          modify — add onDelete: Cascade
lib/utils.ts                                  modify — add makePublisherId, makeCreatorId
tests/unit/utils.test.ts                      modify — add tests for new functions

app/admin/(main)/layout.tsx                   create — shared sidebar layout
app/admin/(main)/layout.module.css            create
app/admin/_components/AdminSidebar.tsx        create — client, active-link nav
app/admin/_components/AdminSidebar.module.css create
app/admin/_components/FormField.tsx           create — label + input wrapper
app/admin/_components/FormField.module.css    create
app/admin/_components/DeleteButton.tsx        create — confirm + DELETE fetch
app/admin/_components/CreditsEditor.tsx       create — inline credit rows
app/admin/_components/CreditsEditor.module.css create

app/admin/(main)/covers/                      move from app/admin/covers/ (URL unchanged)

app/admin/(main)/publishers/page.tsx          create — list
app/admin/(main)/publishers/page.module.css   create
app/admin/(main)/publishers/new/page.tsx      create
app/admin/(main)/publishers/[id]/edit/page.tsx create
app/admin/(main)/publishers/PublisherForm.tsx  create — client form
app/admin/(main)/publishers/PublisherForm.module.css create
app/api/admin/publishers/route.ts             create — POST
app/api/admin/publishers/[id]/route.ts        create — PUT + DELETE

app/admin/(main)/creators/page.tsx            create
app/admin/(main)/creators/page.module.css     create
app/admin/(main)/creators/new/page.tsx        create
app/admin/(main)/creators/[id]/edit/page.tsx  create
app/admin/(main)/creators/CreatorForm.tsx     create
app/admin/(main)/creators/CreatorForm.module.css create
app/api/admin/creators/route.ts               create — POST
app/api/admin/creators/[id]/route.ts          create — PUT + DELETE

app/admin/(main)/series/page.tsx              create
app/admin/(main)/series/page.module.css       create
app/admin/(main)/series/new/page.tsx          create
app/admin/(main)/series/[id]/edit/page.tsx    create
app/admin/(main)/series/SeriesForm.tsx        create
app/admin/(main)/series/SeriesForm.module.css create
app/api/admin/series/route.ts                 create — POST
app/api/admin/series/[id]/route.ts            create — PUT + DELETE

app/admin/(main)/issues/page.tsx              create
app/admin/(main)/issues/page.module.css       create
app/admin/(main)/issues/new/page.tsx          create
app/admin/(main)/issues/[id]/edit/page.tsx    create
app/admin/(main)/issues/IssueForm.tsx         create
app/admin/(main)/issues/IssueForm.module.css  create
app/api/admin/issues/route.ts                 create — POST
app/api/admin/issues/[id]/route.ts            create — PUT + DELETE
```

---

## Task 1: Prisma schema — cascade deletes

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add `onDelete: Cascade` to all four foreign key relations**

Replace the four relation lines in `prisma/schema.prisma`:

```prisma
model Series {
  id            String    @id
  name          String
  publisherId   String
  publisher     Publisher @relation(fields: [publisherId], references: [id], onDelete: Cascade)
  startYear     Int?
  endYear       Int?
  status        Status    @default(ONGOING)
  genre         String?
  description   String?
  paletteBg     String?
  paletteAccent String?
  paletteInk    String?
  issues        Issue[]
}

model Issue {
  id         String        @id
  seriesId   String
  series     Series        @relation(fields: [seriesId], references: [id], onDelete: Cascade)
  number     Int?
  title      String?
  coverDate  DateTime?
  pages      Int?
  price      Decimal?      @db.Decimal(5, 2)
  synopsis   String?
  coverImage String?
  credits    IssueCredit[]

  @@unique([seriesId, number])
}

model IssueCredit {
  id        String  @id @default(cuid())
  issueId   String
  creatorId String
  role      Role
  issue     Issue   @relation(fields: [issueId], references: [id], onDelete: Cascade)
  creator   Creator @relation(fields: [creatorId], references: [id], onDelete: Cascade)
}
```

- [ ] **Step 2: Push schema to database**

```bash
cd panels
npx prisma db push
```

Expected output includes: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 3: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add onDelete cascade to schema relations"
```

---

## Task 2: Utility functions — makePublisherId and makeCreatorId

**Files:**
- Modify: `lib/utils.ts`
- Modify: `tests/unit/utils.test.ts`

- [ ] **Step 1: Write the failing tests**

Add to `tests/unit/utils.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { normalise, titleToSlug, parseCoverPrice, makeSeriesId, makeIssueId, makePublisherId, makeCreatorId } from '@/lib/utils'

// ... existing tests unchanged ...

describe('makePublisherId', () => {
  it('slugifies publisher name', () => {
    expect(makePublisherId('Marvel Comics')).toBe('marvel-comics')
  })
  it('handles special characters', () => {
    expect(makePublisherId("Dark Horse")).toBe('dark-horse')
  })
})

describe('makeCreatorId', () => {
  it('slugifies creator name', () => {
    expect(makeCreatorId('Stan Lee')).toBe('stan-lee')
  })
  it('handles apostrophes', () => {
    expect(makeCreatorId("Neil Gaiman")).toBe('neil-gaiman')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx vitest run tests/unit/utils.test.ts
```

Expected: FAIL — `makePublisherId is not exported`

- [ ] **Step 3: Add the two functions to `lib/utils.ts`**

Append to the end of `lib/utils.ts`:

```ts
export function makePublisherId(name: string): string {
  return titleToSlug(name)
}

export function makeCreatorId(name: string): string {
  return titleToSlug(name)
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx vitest run tests/unit/utils.test.ts
```

Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add lib/utils.ts tests/unit/utils.test.ts
git commit -m "feat: add makePublisherId and makeCreatorId to utils"
```

---

## Task 3: Shared admin layout, sidebar, and move covers

**Files:**
- Create: `app/admin/(main)/layout.tsx`
- Create: `app/admin/(main)/layout.module.css`
- Create: `app/admin/_components/AdminSidebar.tsx`
- Create: `app/admin/_components/AdminSidebar.module.css`
- Move: `app/admin/covers/` → `app/admin/(main)/covers/`

- [ ] **Step 1: Create the route group layout**

Create `app/admin/(main)/layout.tsx`:

```tsx
import AdminSidebar from '@/app/admin/_components/AdminSidebar'
import styles from './layout.module.css'

export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <main className={styles.content}>{children}</main>
    </div>
  )
}
```

- [ ] **Step 2: Create layout CSS**

Create `app/admin/(main)/layout.module.css`:

```css
.shell {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
}

.content {
  flex: 1;
  min-width: 0;
  padding: 2rem 2.5rem;
}

@media (max-width: 768px) {
  .shell { flex-direction: column; }
  .content { padding: 1.25rem 1rem; }
}
```

- [ ] **Step 3: Create AdminSidebar component**

Create `app/admin/_components/AdminSidebar.tsx`:

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './AdminSidebar.module.css'

const MEDIA_LINKS = [
  { href: '/admin/covers', label: 'Covers' },
]

const CATALOGUE_LINKS = [
  { href: '/admin/issues', label: 'Issues' },
  { href: '/admin/series', label: 'Series' },
  { href: '/admin/publishers', label: 'Publishers' },
  { href: '/admin/creators', label: 'Creators' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.brand}>PANELS ADMIN</div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Media</div>
        {MEDIA_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Catalogue</div>
        {CATALOGUE_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/api/admin/logout" className={styles.logout}>Logout →</Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Create AdminSidebar CSS**

Create `app/admin/_components/AdminSidebar.module.css`:

```css
.sidebar {
  width: 180px;
  min-width: 180px;
  background: #0e1624;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  min-height: 100vh;
}

.brand {
  font-family: var(--font-display);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: var(--brand);
  padding: 0 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}

.section {
  margin-bottom: 1.5rem;
}

.sectionLabel {
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
  padding: 0 1.25rem 0.5rem;
}

.link {
  display: block;
  padding: 0.4rem 1.25rem;
  color: var(--text-sub);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s;
}

.link:hover {
  color: var(--text);
}

.link.active {
  color: var(--text);
  background: var(--surface);
  border-right: 2px solid var(--brand);
}

.footer {
  margin-top: auto;
  padding: 0 1.25rem;
}

.logout {
  color: var(--text-muted);
  font-size: 0.8125rem;
  text-decoration: none;
}

.logout:hover {
  color: var(--text-sub);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-height: unset;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .brand { display: none; }
  .section { display: flex; gap: 0.25rem; margin: 0; }
  .sectionLabel { display: none; }
  .link { padding: 0.25rem 0.75rem; border-radius: var(--radius-pill); font-size: 0.8125rem; }
  .link.active { border-right: none; background: var(--surface); }
  .footer { margin: 0; padding: 0; }
}
```

- [ ] **Step 5: Move the covers directory into the route group**

```bash
mkdir -p app/admin/\(main\)
mv app/admin/covers app/admin/\(main\)/covers
```

- [ ] **Step 6: Verify the app still builds**

```bash
npm run build
```

Expected: build succeeds, `/admin/covers` still resolves correctly.

- [ ] **Step 7: Commit**

```bash
git add app/admin/\(main\)/ app/admin/_components/
git commit -m "feat: shared admin sidebar layout, move covers into route group"
```

---

## Task 4: Shared form components

**Files:**
- Create: `app/admin/_components/FormField.tsx`
- Create: `app/admin/_components/FormField.module.css`
- Create: `app/admin/_components/DeleteButton.tsx`
- Create: `app/admin/_components/CreditsEditor.tsx`
- Create: `app/admin/_components/CreditsEditor.module.css`

- [ ] **Step 1: Create FormField component**

Create `app/admin/_components/FormField.tsx`:

```tsx
import styles from './FormField.module.css'

interface Props {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export default function FormField({ label, required, error, children }: Props) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}{required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Create FormField CSS**

Create `app/admin/_components/FormField.module.css`:

```css
.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.label {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
}

.required {
  color: var(--brand);
  margin-left: 0.25rem;
}

.error {
  font-size: 0.75rem;
  color: #f87171;
  margin: 0;
}
```

- [ ] **Step 3: Create shared input/textarea/select styles**

Add to `styles/tokens.css` (append at the end):

```css
/* Admin form inputs */
.adminInput,
input.adminInput,
select.adminInput,
textarea.adminInput {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 0.9375rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  font-family: var(--font-body);
  transition: border-color 0.15s;
}

input.adminInput:focus,
select.adminInput:focus,
textarea.adminInput:focus {
  outline: none;
  border-color: var(--brand);
}

textarea.adminInput {
  resize: vertical;
  min-height: 80px;
}
```

- [ ] **Step 4: Create DeleteButton component**

Create `app/admin/_components/DeleteButton.tsx`:

```tsx
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
```

- [ ] **Step 5: Create CreditsEditor component**

Create `app/admin/_components/CreditsEditor.tsx`:

```tsx
'use client'
import styles from './CreditsEditor.module.css'

export interface CreditRow {
  creatorId: string
  role: string
}

interface Creator {
  id: string
  name: string
}

const ROLES = ['WRITER', 'ARTIST', 'INKER', 'COLORIST', 'LETTERER', 'COVER']

interface Props {
  credits: CreditRow[]
  creators: Creator[]
  onChange: (credits: CreditRow[]) => void
}

export default function CreditsEditor({ credits, creators, onChange }: Props) {
  function addRow() {
    onChange([...credits, { creatorId: creators[0]?.id ?? '', role: 'WRITER' }])
  }

  function removeRow(index: number) {
    onChange(credits.filter((_, i) => i !== index))
  }

  function updateRow(index: number, field: keyof CreditRow, value: string) {
    const updated = credits.map((c, i) => i === index ? { ...c, [field]: value } : c)
    onChange(updated)
  }

  return (
    <div className={styles.editor}>
      {credits.map((credit, i) => (
        <div key={i} className={styles.row}>
          <select
            className="adminInput"
            value={credit.creatorId}
            onChange={e => updateRow(i, 'creatorId', e.target.value)}
          >
            {creators.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            className="adminInput"
            value={credit.role}
            onChange={e => updateRow(i, 'role', e.target.value)}
            style={{ maxWidth: '140px' }}
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="button" onClick={() => removeRow(i)} className={styles.remove} aria-label="Remove credit">✕</button>
        </div>
      ))}
      <button type="button" onClick={addRow} className={styles.addBtn}>+ Add credit</button>
    </div>
  )
}
```

- [ ] **Step 6: Create CreditsEditor CSS**

Create `app/admin/_components/CreditsEditor.module.css`:

```css
.editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.row select:first-child {
  flex: 1;
}

.remove {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  line-height: 1;
  flex-shrink: 0;
}

.remove:hover {
  color: #ef4444;
}

.addBtn {
  align-self: flex-start;
  background: transparent;
  border: 1px dashed var(--border);
  color: var(--brand);
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.875rem;
  cursor: pointer;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
}

.addBtn:hover {
  border-color: var(--brand);
}
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add app/admin/_components/ styles/tokens.css
git commit -m "feat: shared admin form components (FormField, DeleteButton, CreditsEditor)"
```

---

## Task 5: Publishers CRUD

**Files:**
- Create: `app/api/admin/publishers/route.ts`
- Create: `app/api/admin/publishers/[id]/route.ts`
- Create: `app/admin/(main)/publishers/page.tsx`
- Create: `app/admin/(main)/publishers/page.module.css`
- Create: `app/admin/(main)/publishers/new/page.tsx`
- Create: `app/admin/(main)/publishers/[id]/edit/page.tsx`
- Create: `app/admin/(main)/publishers/PublisherForm.tsx`
- Create: `app/admin/(main)/publishers/PublisherForm.module.css`

- [ ] **Step 1: Create POST /api/admin/publishers**

Create `app/api/admin/publishers/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makePublisherId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { name, color, founded, hq, bio } = body

  if (!name || !color) {
    return NextResponse.json({ error: 'name and color are required' }, { status: 400 })
  }

  let id = makePublisherId(name)
  const existing = await prisma.publisher.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.publisher.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const publisher = await prisma.publisher.create({
    data: {
      id,
      name,
      color,
      founded: founded ? Number(founded) : null,
      hq: hq || null,
      bio: bio || null,
    },
  })

  return NextResponse.json({ publisher }, { status: 201 })
}
```

- [ ] **Step 2: Create PUT and DELETE /api/admin/publishers/[id]**

Create `app/api/admin/publishers/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { name, color, founded, hq, bio } = body

  if (!name || !color) {
    return NextResponse.json({ error: 'name and color are required' }, { status: 400 })
  }

  const publisher = await prisma.publisher.update({
    where: { id: params.id },
    data: {
      name,
      color,
      founded: founded ? Number(founded) : null,
      hq: hq || null,
      bio: bio || null,
    },
  })

  return NextResponse.json({ publisher })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const publisher = await prisma.publisher.findUnique({
    where: { id: params.id },
    include: { _count: { select: { series: true } } },
  })
  if (!publisher) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.publisher.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Create publishers list page**

Create `app/admin/(main)/publishers/page.tsx`:

```tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function PublishersPage() {
  const publishers = await prisma.publisher.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { series: true } } },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Publishers</h1>
        <Link href="/admin/publishers/new" className={styles.addBtn}>+ Add publisher</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Colour</th>
            <th>Series</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {publishers.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td><span className={styles.swatch} style={{ background: p.color }} />{p.color}</td>
              <td>{p._count.series}</td>
              <td><Link href={`/admin/publishers/${p.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {publishers.length === 0 && <p className={styles.empty}>No publishers yet.</p>}
    </div>
  )
}
```

- [ ] **Step 4: Create publishers page CSS**

Create `app/admin/(main)/publishers/page.module.css`:

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.heading {
  font-family: var(--font-display);
  color: var(--brand);
  font-size: 1.5rem;
  margin: 0;
}

.addBtn {
  background: var(--brand);
  color: #fff;
  padding: 0.5rem 1.125rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.addBtn:hover {
  opacity: 0.9;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.table th {
  text-align: left;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.75rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  vertical-align: middle;
}

.swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.editLink {
  color: var(--brand);
  text-decoration: none;
  font-size: 0.875rem;
}

.empty {
  color: var(--text-muted);
  margin-top: 2rem;
}
```

- [ ] **Step 5: Create PublisherForm client component**

Create `app/admin/(main)/publishers/PublisherForm.tsx`:

```tsx
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
```

- [ ] **Step 6: Create PublisherForm CSS**

Create `app/admin/(main)/publishers/PublisherForm.module.css`:

```css
.form {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
}

.colorRow {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.colorPicker {
  width: 40px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  cursor: pointer;
  padding: 2px;
  flex-shrink: 0;
}

.error {
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 0.5rem;
}

.saveBtn {
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.5625rem 1.25rem;
  font-size: 0.9375rem;
  cursor: pointer;
  font-family: var(--font-body);
}

.saveBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

- [ ] **Step 7: Create new publisher page**

Create `app/admin/(main)/publishers/new/page.tsx`:

```tsx
import Link from 'next/link'
import PublisherForm from '../PublisherForm'
import styles from '../page.module.css'

export default function NewPublisherPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add publisher</h1>
        <Link href="/admin/publishers" className={styles.editLink}>← Back</Link>
      </div>
      <PublisherForm />
    </div>
  )
}
```

- [ ] **Step 8: Create edit publisher page**

Create `app/admin/(main)/publishers/[id]/edit/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import PublisherForm from '../../PublisherForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditPublisherPage({ params }: { params: { id: string } }) {
  const publisher = await prisma.publisher.findUnique({ where: { id: params.id } })
  if (!publisher) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit publisher</h1>
        <Link href="/admin/publishers" className={styles.editLink}>← Back</Link>
      </div>
      <PublisherForm publisher={{
        id: publisher.id,
        name: publisher.name,
        color: publisher.color,
        founded: publisher.founded,
        hq: publisher.hq,
        bio: publisher.bio,
      }} />
    </div>
  )
}
```

- [ ] **Step 9: Verify build and commit**

```bash
npm run build
git add app/admin/\(main\)/publishers/ app/api/admin/publishers/
git commit -m "feat: publishers CRUD admin pages and API routes"
```

---

## Task 6: Creators CRUD

**Files:**
- Create: `app/api/admin/creators/route.ts`
- Create: `app/api/admin/creators/[id]/route.ts`
- Create: `app/admin/(main)/creators/page.tsx`
- Create: `app/admin/(main)/creators/page.module.css`
- Create: `app/admin/(main)/creators/new/page.tsx`
- Create: `app/admin/(main)/creators/[id]/edit/page.tsx`
- Create: `app/admin/(main)/creators/CreatorForm.tsx`
- Create: `app/admin/(main)/creators/CreatorForm.module.css`

- [ ] **Step 1: Create POST /api/admin/creators**

Create `app/api/admin/creators/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makeCreatorId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { name, bio } = body

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  let id = makeCreatorId(name)
  const existing = await prisma.creator.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.creator.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const creator = await prisma.creator.create({
    data: { id, name, bio: bio || null },
  })

  return NextResponse.json({ creator }, { status: 201 })
}
```

- [ ] **Step 2: Create PUT and DELETE /api/admin/creators/[id]**

Create `app/api/admin/creators/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { name, bio } = await request.json()
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 })

  const creator = await prisma.creator.update({
    where: { id: params.id },
    data: { name, bio: bio || null },
  })
  return NextResponse.json({ creator })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const creator = await prisma.creator.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!creator) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.creator.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Create creators list page**

Create `app/admin/(main)/creators/page.tsx`:

```tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function CreatorsPage() {
  const creators = await prisma.creator.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { credits: true } } },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Creators</h1>
        <Link href="/admin/creators/new" className={styles.addBtn}>+ Add creator</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Credits</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {creators.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c._count.credits}</td>
              <td><Link href={`/admin/creators/${c.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {creators.length === 0 && <p className={styles.empty}>No creators yet.</p>}
    </div>
  )
}
```

- [ ] **Step 4: Create creators page CSS**

Create `app/admin/(main)/creators/page.module.css`:

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.heading {
  font-family: var(--font-display);
  color: var(--brand);
  font-size: 1.5rem;
  margin: 0;
}

.addBtn {
  background: var(--brand);
  color: #fff;
  padding: 0.5rem 1.125rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.addBtn:hover { opacity: 0.9; }

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.table th {
  text-align: left;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.75rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.editLink {
  color: var(--brand);
  text-decoration: none;
  font-size: 0.875rem;
}

.empty {
  color: var(--text-muted);
  margin-top: 2rem;
}
```

- [ ] **Step 5: Create CreatorForm client component**

Create `app/admin/(main)/creators/CreatorForm.tsx`:

```tsx
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
```

- [ ] **Step 6: Create CreatorForm CSS**

Create `app/admin/(main)/creators/CreatorForm.module.css`:

```css
.form {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.error {
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 0.5rem;
}

.saveBtn {
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.5625rem 1.25rem;
  font-size: 0.9375rem;
  cursor: pointer;
  font-family: var(--font-body);
}

.saveBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

- [ ] **Step 7: Create new and edit pages**

Create `app/admin/(main)/creators/new/page.tsx`:

```tsx
import Link from 'next/link'
import CreatorForm from '../CreatorForm'
import styles from '../page.module.css'

export default function NewCreatorPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add creator</h1>
        <Link href="/admin/creators" className={styles.editLink}>← Back</Link>
      </div>
      <CreatorForm />
    </div>
  )
}
```

Create `app/admin/(main)/creators/[id]/edit/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import CreatorForm from '../../CreatorForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditCreatorPage({ params }: { params: { id: string } }) {
  const creator = await prisma.creator.findUnique({ where: { id: params.id } })
  if (!creator) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit creator</h1>
        <Link href="/admin/creators" className={styles.editLink}>← Back</Link>
      </div>
      <CreatorForm creator={{ id: creator.id, name: creator.name, bio: creator.bio }} />
    </div>
  )
}
```

- [ ] **Step 8: Verify build and commit**

```bash
npm run build
git add app/admin/\(main\)/creators/ app/api/admin/creators/
git commit -m "feat: creators CRUD admin pages and API routes"
```

---

## Task 7: Series CRUD

**Files:**
- Create: `app/api/admin/series/route.ts`
- Create: `app/api/admin/series/[id]/route.ts`
- Create: `app/admin/(main)/series/page.tsx`
- Create: `app/admin/(main)/series/page.module.css`
- Create: `app/admin/(main)/series/new/page.tsx`
- Create: `app/admin/(main)/series/[id]/edit/page.tsx`
- Create: `app/admin/(main)/series/SeriesForm.tsx`
- Create: `app/admin/(main)/series/SeriesForm.module.css`

- [ ] **Step 1: Create POST /api/admin/series**

Create `app/api/admin/series/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makeSeriesId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { publisherId, name, startYear, endYear, status, genre, description, paletteBg, paletteAccent, paletteInk } = body

  if (!publisherId || !name) {
    return NextResponse.json({ error: 'publisherId and name are required' }, { status: 400 })
  }

  const publisher = await prisma.publisher.findUnique({ where: { id: publisherId }, select: { id: true } })
  if (!publisher) return NextResponse.json({ error: 'Publisher not found' }, { status: 400 })

  let id = makeSeriesId(publisherId, name)
  const existing = await prisma.series.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.series.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const series = await prisma.series.create({
    data: {
      id,
      publisherId,
      name,
      startYear: startYear ? Number(startYear) : null,
      endYear: endYear ? Number(endYear) : null,
      status: status || 'ONGOING',
      genre: genre || null,
      description: description || null,
      paletteBg: paletteBg || null,
      paletteAccent: paletteAccent || null,
      paletteInk: paletteInk || null,
    },
  })

  return NextResponse.json({ series }, { status: 201 })
}
```

- [ ] **Step 2: Create PUT and DELETE /api/admin/series/[id]**

Create `app/api/admin/series/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { publisherId, name, startYear, endYear, status, genre, description, paletteBg, paletteAccent, paletteInk } = body

  if (!publisherId || !name) {
    return NextResponse.json({ error: 'publisherId and name are required' }, { status: 400 })
  }

  const series = await prisma.series.update({
    where: { id: params.id },
    data: {
      publisherId,
      name,
      startYear: startYear ? Number(startYear) : null,
      endYear: endYear ? Number(endYear) : null,
      status: status || 'ONGOING',
      genre: genre || null,
      description: description || null,
      paletteBg: paletteBg || null,
      paletteAccent: paletteAccent || null,
      paletteInk: paletteInk || null,
    },
  })
  return NextResponse.json({ series })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const series = await prisma.series.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!series) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.series.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Create series list page**

Create `app/admin/(main)/series/page.tsx`:

```tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function SeriesPage() {
  const series = await prisma.series.findMany({
    orderBy: [{ publisher: { name: 'asc' } }, { name: 'asc' }],
    include: {
      publisher: { select: { name: true } },
      _count: { select: { issues: true } },
    },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Series</h1>
        <Link href="/admin/series/new" className={styles.addBtn}>+ Add series</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Publisher</th>
            <th>Status</th>
            <th>Issues</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {series.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.publisher.name}</td>
              <td><span className={styles.status}>{s.status}</span></td>
              <td>{s._count.issues}</td>
              <td><Link href={`/admin/series/${s.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {series.length === 0 && <p className={styles.empty}>No series yet.</p>}
    </div>
  )
}
```

- [ ] **Step 4: Create series page CSS**

Create `app/admin/(main)/series/page.module.css`:

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.heading {
  font-family: var(--font-display);
  color: var(--brand);
  font-size: 1.5rem;
  margin: 0;
}

.addBtn {
  background: var(--brand);
  color: #fff;
  padding: 0.5rem 1.125rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.addBtn:hover { opacity: 0.9; }

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.table th {
  text-align: left;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.75rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.status {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--surface);
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-pill);
}

.editLink {
  color: var(--brand);
  text-decoration: none;
  font-size: 0.875rem;
}

.empty {
  color: var(--text-muted);
  margin-top: 2rem;
}
```

- [ ] **Step 5: Create SeriesForm client component**

Create `app/admin/(main)/series/SeriesForm.tsx`:

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormField from '@/app/admin/_components/FormField'
import DeleteButton from '@/app/admin/_components/DeleteButton'
import styles from './SeriesForm.module.css'

const STATUS_OPTIONS = ['ONGOING', 'COMPLETED', 'CANCELLED', 'HIATUS']

interface Publisher { id: string; name: string }

interface Series {
  id: string
  name: string
  publisherId: string
  startYear: number | null
  endYear: number | null
  status: string
  genre: string | null
  description: string | null
  paletteBg: string | null
  paletteAccent: string | null
  paletteInk: string | null
}

interface Props {
  publishers: Publisher[]
  series?: Series
}

export default function SeriesForm({ publishers, series }: Props) {
  const router = useRouter()
  const isEdit = !!series

  const [publisherId, setPublisherId] = useState(series?.publisherId ?? publishers[0]?.id ?? '')
  const [name, setName] = useState(series?.name ?? '')
  const [startYear, setStartYear] = useState(series?.startYear?.toString() ?? '')
  const [endYear, setEndYear] = useState(series?.endYear?.toString() ?? '')
  const [status, setStatus] = useState(series?.status ?? 'ONGOING')
  const [genre, setGenre] = useState(series?.genre ?? '')
  const [description, setDescription] = useState(series?.description ?? '')
  const [paletteBg, setPaletteBg] = useState(series?.paletteBg ?? '#1E2A44')
  const [paletteAccent, setPaletteAccent] = useState(series?.paletteAccent ?? '#E8743C')
  const [paletteInk, setPaletteInk] = useState(series?.paletteInk ?? '#F5E8D0')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = isEdit ? `/api/admin/series/${series.id}` : '/api/admin/series'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publisherId,
          name,
          startYear: startYear || null,
          endYear: endYear || null,
          status,
          genre: genre || null,
          description: description || null,
          paletteBg: paletteBg || null,
          paletteAccent: paletteAccent || null,
          paletteInk: paletteInk || null,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Save failed')
        return
      }
      router.push('/admin/series?saved=1')
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
        <FormField label="Publisher" required>
          <select className="adminInput" value={publisherId} onChange={e => setPublisherId(e.target.value)} required>
            {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </FormField>

        <FormField label="Name" required>
          <input className="adminInput" value={name} onChange={e => setName(e.target.value)} required />
        </FormField>

        <FormField label="Start year">
          <input className="adminInput" type="number" value={startYear} onChange={e => setStartYear(e.target.value)} placeholder="1963" />
        </FormField>

        <FormField label="End year">
          <input className="adminInput" type="number" value={endYear} onChange={e => setEndYear(e.target.value)} placeholder="leave blank if ongoing" />
        </FormField>

        <FormField label="Status" required>
          <select className="adminInput" value={status} onChange={e => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label="Genre">
          <input className="adminInput" value={genre} onChange={e => setGenre(e.target.value)} placeholder="Superhero, Horror, Sci-Fi…" />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea className="adminInput" value={description} onChange={e => setDescription(e.target.value)} rows={4} />
      </FormField>

      <div className={styles.paletteRow}>
        <FormField label="Palette — background">
          <div className={styles.colorRow}>
            <input type="color" value={paletteBg} onChange={e => setPaletteBg(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={paletteBg} onChange={e => setPaletteBg(e.target.value)} />
          </div>
        </FormField>
        <FormField label="Palette — accent">
          <div className={styles.colorRow}>
            <input type="color" value={paletteAccent} onChange={e => setPaletteAccent(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={paletteAccent} onChange={e => setPaletteAccent(e.target.value)} />
          </div>
        </FormField>
        <FormField label="Palette — ink">
          <div className={styles.colorRow}>
            <input type="color" value={paletteInk} onChange={e => setPaletteInk(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={paletteInk} onChange={e => setPaletteInk(e.target.value)} />
          </div>
        </FormField>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" disabled={saving} className={styles.saveBtn}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create series'}
        </button>
        {isEdit && (
          <DeleteButton
            id={series.id}
            entityName={series.name}
            apiPath="/api/admin/series"
            redirectTo="/admin/series"
            confirmMessage={`Delete ${series.name}? This will also delete all its issues and credits. This cannot be undone.`}
          />
        )}
      </div>
    </form>
  )
}
```

- [ ] **Step 6: Create SeriesForm CSS**

Create `app/admin/(main)/series/SeriesForm.module.css`:

```css
.form {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.paletteRow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  .paletteRow { grid-template-columns: 1fr; }
}

.colorRow {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.colorPicker {
  width: 40px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  cursor: pointer;
  padding: 2px;
  flex-shrink: 0;
}

.error {
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 0.5rem;
}

.saveBtn {
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.5625rem 1.25rem;
  font-size: 0.9375rem;
  cursor: pointer;
  font-family: var(--font-body);
}

.saveBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

- [ ] **Step 7: Create new and edit pages**

Create `app/admin/(main)/series/new/page.tsx`:

```tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import SeriesForm from '../SeriesForm'
import styles from '../page.module.css'

export const dynamic = 'force-dynamic'

export default async function NewSeriesPage() {
  const publishers = await prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add series</h1>
        <Link href="/admin/series" className={styles.editLink}>← Back</Link>
      </div>
      <SeriesForm publishers={publishers} />
    </div>
  )
}
```

Create `app/admin/(main)/series/[id]/edit/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import SeriesForm from '../../SeriesForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditSeriesPage({ params }: { params: { id: string } }) {
  const [series, publishers] = await Promise.all([
    prisma.series.findUnique({ where: { id: params.id } }),
    prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!series) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit series</h1>
        <Link href="/admin/series" className={styles.editLink}>← Back</Link>
      </div>
      <SeriesForm publishers={publishers} series={{
        id: series.id,
        name: series.name,
        publisherId: series.publisherId,
        startYear: series.startYear,
        endYear: series.endYear,
        status: series.status,
        genre: series.genre,
        description: series.description,
        paletteBg: series.paletteBg,
        paletteAccent: series.paletteAccent,
        paletteInk: series.paletteInk,
      }} />
    </div>
  )
}
```

- [ ] **Step 8: Verify build and commit**

```bash
npm run build
git add app/admin/\(main\)/series/ app/api/admin/series/
git commit -m "feat: series CRUD admin pages and API routes"
```

---

## Task 8: Issues CRUD

**Files:**
- Create: `app/api/admin/issues/route.ts`
- Create: `app/api/admin/issues/[id]/route.ts`
- Create: `app/admin/(main)/issues/page.tsx`
- Create: `app/admin/(main)/issues/page.module.css`
- Create: `app/admin/(main)/issues/new/page.tsx`
- Create: `app/admin/(main)/issues/[id]/edit/page.tsx`
- Create: `app/admin/(main)/issues/IssueForm.tsx`
- Create: `app/admin/(main)/issues/IssueForm.module.css`

- [ ] **Step 1: Create POST /api/admin/issues**

Create `app/api/admin/issues/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makeIssueId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { seriesId, number, title, coverDate, pages, price, synopsis, credits } = body

  if (!seriesId || number === undefined || number === null) {
    return NextResponse.json({ error: 'seriesId and number are required' }, { status: 400 })
  }

  const series = await prisma.series.findUnique({ where: { id: seriesId }, select: { id: true } })
  if (!series) return NextResponse.json({ error: 'Series not found' }, { status: 400 })

  const issueNumber = Number(number)
  let id = makeIssueId(seriesId, issueNumber)
  const existing = await prisma.issue.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.issue.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const issue = await prisma.issue.create({
    data: {
      id,
      seriesId,
      number: issueNumber,
      title: title || null,
      coverDate: coverDate ? new Date(coverDate) : null,
      pages: pages ? Number(pages) : null,
      price: price ? String(price) : null,
      synopsis: synopsis || null,
      credits: credits?.length
        ? { create: (credits as { creatorId: string; role: string }[]).map(c => ({ creatorId: c.creatorId, role: c.role as any })) }
        : undefined,
    },
  })

  return NextResponse.json({ issue }, { status: 201 })
}
```

- [ ] **Step 2: Create PUT and DELETE /api/admin/issues/[id]**

Create `app/api/admin/issues/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { seriesId, number, title, coverDate, pages, price, synopsis, credits } = body

  if (!seriesId || number === undefined || number === null) {
    return NextResponse.json({ error: 'seriesId and number are required' }, { status: 400 })
  }

  await prisma.$transaction([
    prisma.issueCredit.deleteMany({ where: { issueId: params.id } }),
    prisma.issue.update({
      where: { id: params.id },
      data: {
        seriesId,
        number: Number(number),
        title: title || null,
        coverDate: coverDate ? new Date(coverDate) : null,
        pages: pages ? Number(pages) : null,
        price: price ? String(price) : null,
        synopsis: synopsis || null,
        credits: credits?.length
          ? { create: (credits as { creatorId: string; role: string }[]).map(c => ({ creatorId: c.creatorId, role: c.role as any })) }
          : undefined,
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const issue = await prisma.issue.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!issue) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.issue.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Create issues list page**

Create `app/admin/(main)/issues/page.tsx`:

```tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({
    orderBy: [{ series: { name: 'asc' } }, { number: 'asc' }],
    select: {
      id: true,
      number: true,
      title: true,
      coverImage: true,
      series: { select: { name: true } },
    },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Issues</h1>
        <Link href="/admin/issues/new" className={styles.addBtn}>+ Add issue</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Series</th>
            <th>#</th>
            <th>Title</th>
            <th>Cover</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.id}>
              <td>{i.series.name}</td>
              <td>{i.number}</td>
              <td>{i.title ?? '—'}</td>
              <td>{i.coverImage ? <span className={styles.hasCover}>✓</span> : <span className={styles.noCover}>—</span>}</td>
              <td><Link href={`/admin/issues/${i.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {issues.length === 0 && <p className={styles.empty}>No issues yet.</p>}
    </div>
  )
}
```

- [ ] **Step 4: Create issues page CSS**

Create `app/admin/(main)/issues/page.module.css`:

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.heading {
  font-family: var(--font-display);
  color: var(--brand);
  font-size: 1.5rem;
  margin: 0;
}

.addBtn {
  background: var(--brand);
  color: #fff;
  padding: 0.5rem 1.125rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.addBtn:hover { opacity: 0.9; }

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.table th {
  text-align: left;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.75rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.hasCover { color: #4ade80; }
.noCover { color: var(--text-muted); }

.editLink {
  color: var(--brand);
  text-decoration: none;
  font-size: 0.875rem;
}

.empty {
  color: var(--text-muted);
  margin-top: 2rem;
}
```

- [ ] **Step 5: Create IssueForm client component**

Create `app/admin/(main)/issues/IssueForm.tsx`:

```tsx
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
```

- [ ] **Step 6: Create IssueForm CSS**

Create `app/admin/(main)/issues/IssueForm.module.css`:

```css
.form {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
}

.creditsLabel {
  font-size: 0.8125rem;
  color: var(--brand);
  font-weight: 600;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.error {
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 0.5rem;
}

.saveBtn {
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.5625rem 1.25rem;
  font-size: 0.9375rem;
  cursor: pointer;
  font-family: var(--font-body);
}

.saveBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

- [ ] **Step 7: Create new and edit pages**

Create `app/admin/(main)/issues/new/page.tsx`:

```tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import IssueForm from '../IssueForm'
import styles from '../page.module.css'

export const dynamic = 'force-dynamic'

export default async function NewIssuePage() {
  const [seriesList, creators] = await Promise.all([
    prisma.series.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.creator.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add issue</h1>
        <Link href="/admin/issues" className={styles.editLink}>← Back</Link>
      </div>
      <IssueForm seriesList={seriesList} creators={creators} />
    </div>
  )
}
```

Create `app/admin/(main)/issues/[id]/edit/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import IssueForm from '../../IssueForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditIssuePage({ params }: { params: { id: string } }) {
  const [issue, seriesList, creators] = await Promise.all([
    prisma.issue.findUnique({
      where: { id: params.id },
      include: { credits: { select: { creatorId: true, role: true } } },
    }),
    prisma.series.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.creator.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!issue) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit issue</h1>
        <Link href="/admin/issues" className={styles.editLink}>← Back</Link>
      </div>
      <IssueForm
        seriesList={seriesList}
        creators={creators}
        issue={{
          id: issue.id,
          seriesId: issue.seriesId,
          number: issue.number,
          title: issue.title,
          coverDate: issue.coverDate ? issue.coverDate.toISOString().slice(0, 7) : null,
          pages: issue.pages,
          price: issue.price ? String(issue.price) : null,
          synopsis: issue.synopsis,
          credits: issue.credits.map(c => ({ creatorId: c.creatorId, role: c.role })),
        }}
      />
    </div>
  )
}
```

- [ ] **Step 8: Verify build and commit**

```bash
npm run build
git add app/admin/\(main\)/issues/ app/api/admin/issues/
git commit -m "feat: issues CRUD admin pages and API routes"
```

---

## Task 9: Deploy to VPS

**Files:** none (deployment only)

- [ ] **Step 1: Push all commits to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Pull, build, and restart on VPS**

```bash
ssh root@187.77.130.76 "source ~/.nvm/nvm.sh && cd /var/www/panels && git pull origin main && npm run build && pm2 restart panels"
```

Expected: build succeeds, PM2 shows `status: online`.

- [ ] **Step 3: Run `npx prisma db push` on VPS to apply cascade changes**

```bash
ssh root@187.77.130.76 "source ~/.nvm/nvm.sh && cd /var/www/panels && npx prisma db push"
```

Expected: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 4: Smoke test**

Visit `https://panels.trav-a-matic.tech/admin/publishers` — publishers list loads with sidebar.
Visit `https://panels.trav-a-matic.tech/admin/publishers/new` — add form loads.
Visit `https://panels.trav-a-matic.tech/admin/issues/new` — issue form with credits editor loads.
