# PANELS — Admin filter, layout fix, cover lightbox

**Date:** 2026-06-06
**Scope:** Three independent improvements — admin issues filter, issue page horizontal overflow fix, cover lightbox

---

## 1. Admin/Issues filter

### Goal
Allow admins to narrow the issues table by publisher, series, issue number, and title without leaving the page or hitting the server.

### Context
`IssuesTable.tsx` is already a client component that receives all 399 issues as a prop. All filtering is done in-memory — no API changes needed.

### Filter controls
A filter row rendered between the page header and the table:

| Control | Type | Behaviour |
|---------|------|-----------|
| Publisher | `<select>` | Options derived from unique publishers in the loaded data |
| Series | `<select>` | Options filtered to match the selected publisher (shows all if publisher is "All") |
| Issue # | `<input type="number">` | Exact match on `issue.number` |
| Title | `<input type="text">` | Case-insensitive substring match on `issue.title` |

All four filters apply simultaneously. A **Clear** button appears when any filter is active and resets all controls.

A small "Showing X of 399" count appears below the filter row whenever results are narrowed.

### Implementation
- Add `publisher`, `series`, `issueNum`, `title` state to `IssuesTable.tsx`
- Derive `filteredIssues` with `useMemo` over `issues`
- Series dropdown options derived from `issues` filtered by selected publisher only (not by title/number) — options stay stable as text filters change
- Filter row styled in `IssuesTable.module.css` — a flex row with gap, sitting below the table header area but above `<table>`

### Non-goals
- No URL params / server-side filtering (data already loaded)
- No debounce needed (pure in-memory, instant)

---

## 2. Issue page horizontal overflow

### Root cause
`IssueStrip` is a `grid-auto-flow: column` element (unbounded width) inside the `.detail` article. That article is a CSS grid column declared as `1fr`. CSS grid columns default to `min-width: auto`, meaning they expand to fit content rather than being capped at their track size. The strip therefore pushes the column — and the whole page — wider than the viewport.

### Fix
Add `min-width: 0` to `.detail` in `app/issue/[id]/page.module.css`.

```css
.detail { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
```

One line, no component changes.

---

## 3. Cover lightbox

### Goal
Clicking a cover image on the issue detail page opens a full-screen overlay showing the cover at maximum readable size. Only applies when a real cover image exists (placeholder covers are not clickable).

### Behaviour
- Clicking the cover → dark overlay fades in (`rgba(0,0,0,0.92)`), cover centred with `max-height: 90vh; max-width: 90vw; object-fit: contain`
- Dismiss by clicking anywhere on the overlay or pressing Escape
- Fade animation via CSS `opacity` transition; skipped when `prefers-reduced-motion: reduce`

### Implementation
- New `CoverLightbox.tsx` co-located at `app/issue/[id]/CoverLightbox.tsx`
- New `CoverLightbox.module.css` for overlay styles
- `'use client'` — uses `useState`, `useEffect` (Escape key listener), `createPortal` (renders overlay into `document.body`)
- `issue/[id]/page.tsx` replaces `<Cover ... />` with `<CoverLightbox>` wrapping it
- The cover itself renders as a `<button>` (accessible, keyboard activatable) only when `coverImage` is non-null; otherwise falls through to plain `<Cover>`

### Accessibility
- `role="dialog"` on overlay, `aria-label="Cover image"`, `aria-modal="true"`
- Focus trapped inside overlay while open; focus returns to trigger on close
- `button` cursor on hover over cover when lightbox is available

---

## Files changed

| File | Change |
|------|--------|
| `app/admin/(main)/issues/IssuesTable.tsx` | Add filter state, filter row UI, filtered results |
| `app/admin/(main)/issues/IssuesTable.module.css` | Filter row styles |
| `app/issue/[id]/page.module.css` | Add `min-width: 0` to `.detail` |
| `app/issue/[id]/page.tsx` | Replace `<Cover>` in sidebar with `<CoverLightbox>` |
| `app/issue/[id]/CoverLightbox.tsx` | New client component |
| `app/issue/[id]/CoverLightbox.module.css` | New overlay styles |
