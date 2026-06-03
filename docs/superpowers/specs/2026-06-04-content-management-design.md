# Content Management — Design Spec

**Date:** 2026-06-04
**Phase:** 2b
**Status:** Approved

---

## Overview

Add full CRUD content management to the PANELS admin area. Admins can add, edit, and delete Publishers, Series, Issues, and Creators through a dedicated admin UI. All admin pages share a sidebar navigation layout. The existing cover upload panel (Phase 2a) is incorporated into the sidebar.

---

## Goals

- Add, edit, and delete Publishers, Series, Issues, and Creators
- Manage credits inline on the issue form (creator + role per row)
- Shared admin sidebar navigation across all admin pages
- Auto-generate human-readable IDs (slugs) from names/numbers
- Delete any entity with a confirmation prompt; cascade to child records

---

## Out of Scope

- ComicVine or bulk import
- Image resizing or optimisation
- Multi-user admin / role-based access
- Story arc or genre tagging (Phase 2c)

---

## Architecture

### Shared Admin Layout

A new route group `app/admin/(main)/` contains all protected admin pages. Its `layout.tsx` adds the persistent left sidebar. Login stays outside the group at `app/admin/login/` so it renders without a sidebar.

The existing covers page moves from `app/admin/covers/` to `app/admin/(main)/covers/` — URL is unchanged (`/admin/covers`), only the file path moves.

The sidebar has two sections:

**MEDIA**
- Covers (existing)

**CATALOGUE**
- Issues
- Series
- Publishers
- Creators

Logout link at the bottom.

The existing `app/admin/covers/` and `app/admin/login/` pages are unaffected — the layout wraps them automatically.

### Routes

| Route | Description |
|---|---|
| `app/admin/(main)/layout.tsx` | Shared sidebar layout (new) |
| `app/admin/(main)/covers/` | Covers panel (moved from `app/admin/covers/`) |
| `/admin/issues` | Issue list |
| `/admin/issues/new` | Add issue form |
| `/admin/issues/[id]/edit` | Edit issue form |
| `/admin/series` | Series list |
| `/admin/series/new` | Add series form |
| `/admin/series/[id]/edit` | Edit series form |
| `/admin/publishers` | Publishers list |
| `/admin/publishers/new` | Add publisher form |
| `/admin/publishers/[id]/edit` | Edit publisher form |
| `/admin/creators` | Creators list |
| `/admin/creators/new` | Add creator form |
| `/admin/creators/[id]/edit` | Edit creator form |

### API Routes

All protected by existing middleware (cookie check).

| Route | Method | Description |
|---|---|---|
| `/api/admin/issues` | POST | Create issue + credits |
| `/api/admin/issues/[id]` | PUT | Update issue + credits (replace all) |
| `/api/admin/issues/[id]` | DELETE | Delete issue + credits |
| `/api/admin/series` | POST | Create series |
| `/api/admin/series/[id]` | PUT | Update series |
| `/api/admin/series/[id]` | DELETE | Delete series + issues + credits |
| `/api/admin/publishers` | POST | Create publisher |
| `/api/admin/publishers/[id]` | PUT | Update publisher |
| `/api/admin/publishers/[id]` | DELETE | Delete publisher + series + issues + credits |
| `/api/admin/creators` | POST | Create creator |
| `/api/admin/creators/[id]` | PUT | Update creator |
| `/api/admin/creators/[id]` | DELETE | Delete creator + their IssueCredits |

### ID Generation

IDs are auto-generated on the server — never entered by the user.

| Entity | Pattern | Example |
|---|---|---|
| Publisher | `slugify(name)` | `marvel` |
| Series | `slugify(name)` | `amazing-spider-man` |
| Issue | `{seriesId}-{number}` | `asm-1` |
| Creator | `slugify(name)` | `stan-lee` |

`slugify`: lowercase, spaces → hyphens, strip non-alphanumeric. If the generated ID already exists, append `-2`, `-3`, etc.

---

## Form Fields

### Publisher form

| Field | Required | Type |
|---|---|---|
| Name | Yes | text |
| Colour | Yes | hex colour picker |
| Founded | No | year (integer) |
| HQ | No | text |
| Bio | No | textarea |

### Series form

| Field | Required | Type |
|---|---|---|
| Publisher | Yes | dropdown (all publishers) |
| Name | Yes | text |
| Start year | No | integer |
| End year | No | integer |
| Status | Yes | dropdown: ONGOING / COMPLETED / CANCELLED / HIATUS (default: ONGOING) |
| Genre | No | text |
| Description | No | textarea |
| Palette Bg | No | hex colour picker |
| Palette Accent | No | hex colour picker |
| Palette Ink | No | hex colour picker |

### Issue form

| Field | Required | Type |
|---|---|---|
| Series | Yes | dropdown (all series, sorted by name) |
| Number | Yes | integer |
| Title | No | text |
| Cover date | No | month + year (stored as first-of-month DateTime) |
| Pages | No | integer |
| Price | No | decimal (2dp) |
| Synopsis | No | textarea |
| Credits | No | inline rows (see below) |

**Credits rows:** Each row has a Creator dropdown (all creators, sorted by name) and a Role dropdown (WRITER / ARTIST / INKER / COLORIST / LETTERER / COVER). "+ Add credit" button appends a row. "✕" removes a row. On save, all existing credits for the issue are deleted and replaced with the current rows.

### Creator form

| Field | Required | Type |
|---|---|---|
| Name | Yes | text |
| Bio | No | textarea |

---

## List Pages

Each list page is a server component with `force-dynamic`. Layout:

- Page heading + "Add [entity]" button (top right)
- Table with key fields and Edit / Delete actions per row
- Issues list: sorted by series name + number, shows series name, number, title
- Series list: sorted by publisher + name
- Publishers list: sorted by name
- Creators list: sorted by name, shows credit count

No pagination for MVP — all records loaded (399 issues is acceptable; revisit at 2000+).

---

## Shared Components

| Component | Purpose |
|---|---|
| `app/admin/_components/AdminSidebar.tsx` | Sidebar nav with active link highlighting |
| `app/admin/_components/FormField.tsx` | Label + input/select/textarea wrapper |
| `app/admin/_components/DeleteButton.tsx` | Client component: confirm dialog + DELETE fetch |
| `app/admin/_components/CreditsEditor.tsx` | Client component: dynamic credit rows |

---

## Delete Behaviour

- Delete button on every edit page
- `DeleteButton` shows a `window.confirm` dialog: `"Delete [Name]? This will also delete [N] series / issues / credits. This cannot be undone."`
- For leaf records (Issue, Creator): `"Delete [Name]? This cannot be undone."`
- On confirm: calls the DELETE API route, then redirects to the list page
- Cascade is enforced at the database level via Prisma `onDelete: Cascade`

---

## Prisma Schema Changes

Add `onDelete: Cascade` to foreign key relations so deletes propagate correctly:

```prisma
model Series {
  publisher Publisher @relation(fields: [publisherId], references: [id], onDelete: Cascade)
}

model Issue {
  series Series @relation(fields: [seriesId], references: [id], onDelete: Cascade)
}

model IssueCredit {
  issue   Issue   @relation(fields: [issueId], references: [id], onDelete: Cascade)
  creator Creator @relation(fields: [creatorId], references: [id], onDelete: Cascade)
}
```

After schema change: run `npx prisma db push` on the VPS (no migration needed for adding cascade rules to existing FK constraints on Supabase Postgres).

---

## Error Handling

- Validation on required fields: 400 with `{ error: string }` response
- Duplicate ID (slug collision): server appends `-2`, `-3` silently
- Delete of non-existent record: 404
- Form client shows inline error messages from API responses
- Successful create/edit: redirect to list page with a brief success state (URL query param `?saved=1`)

---

## New Files

| File | Purpose |
|---|---|
| `app/admin/(main)/layout.tsx` | Shared sidebar layout |
| `app/admin/_components/AdminSidebar.tsx` | Sidebar nav |
| `app/admin/_components/FormField.tsx` | Reusable form field wrapper |
| `app/admin/_components/DeleteButton.tsx` | Confirm + delete client component |
| `app/admin/_components/CreditsEditor.tsx` | Inline credits row manager |
| `app/admin/issues/page.tsx` | Issues list |
| `app/admin/issues/new/page.tsx` | Add issue form |
| `app/admin/issues/[id]/edit/page.tsx` | Edit issue form |
| `app/admin/series/page.tsx` | Series list |
| `app/admin/series/new/page.tsx` | Add series form |
| `app/admin/series/[id]/edit/page.tsx` | Edit series form |
| `app/admin/publishers/page.tsx` | Publishers list |
| `app/admin/publishers/new/page.tsx` | Add publisher form |
| `app/admin/publishers/[id]/edit/page.tsx` | Edit publisher form |
| `app/admin/creators/page.tsx` | Creators list |
| `app/admin/creators/new/page.tsx` | Add creator form |
| `app/admin/creators/[id]/edit/page.tsx` | Edit creator form |
| `app/api/admin/issues/route.ts` | POST create issue |
| `app/api/admin/issues/[id]/route.ts` | PUT update / DELETE issue |
| `app/api/admin/series/route.ts` | POST create series |
| `app/api/admin/series/[id]/route.ts` | PUT update / DELETE series |
| `app/api/admin/publishers/route.ts` | POST create publisher |
| `app/api/admin/publishers/[id]/route.ts` | PUT update / DELETE publisher |
| `app/api/admin/creators/route.ts` | POST create creator |
| `app/api/admin/creators/[id]/route.ts` | PUT update / DELETE creator |
| `lib/slugify.ts` | ID slug generator |

---

## Modified Files

| File | Change |
|---|---|
| `prisma/schema.prisma` | Add `onDelete: Cascade` to Series, Issue, IssueCredit relations |
| `app/admin/covers/` → `app/admin/(main)/covers/` | Move into route group (URL unchanged) |
