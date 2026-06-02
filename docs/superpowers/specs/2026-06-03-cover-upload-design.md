# Cover Image Upload — Design Spec

**Date:** 2026-06-03
**Phase:** 2a
**Status:** Approved

---

## Overview

Add a cover image upload pipeline to PANELS. Admins can upload, replace, and delete cover images for any issue. Images are stored in Supabase Storage and served via CDN. The admin area is protected by a single password stored in an environment variable.

---

## Goals

- Upload a JPEG/PNG cover image for any issue
- Replace an incorrect cover with a new one
- Delete a cover (reverts to halftone placeholder)
- Access upload controls from both a dedicated admin panel and individual issue pages
- Protect all admin functionality behind a password

---

## Out of Scope

- Adding or editing issues, series, publishers, or creators (Phase 2b)
- ComicVine or bulk import
- Image resizing or optimisation
- Multi-user admin / role-based access

---

## Architecture

### Storage

- Supabase Storage bucket: `covers` (public read)
- File naming: `{issueId}.jpg` (e.g. `saga-1.jpg`)
- On upload: file written to bucket, public CDN URL saved to `Issue.coverImage` in Postgres
- On delete: file removed from bucket, `Issue.coverImage` set to `null`

### Authentication

- Environment variable: `ADMIN_PASSWORD`
- Login page at `/admin/login` — password form, no username
- On success: sets a signed HttpOnly cookie (`admin_session`) containing an HMAC of the password
- Next.js middleware checks the cookie on all `/admin/*` and `/api/admin/*` routes
- No logout required for MVP (cookie expires after 7 days)

### API Routes

**`POST /api/admin/upload-cover`**
- Auth: middleware (cookie check)
- Body: `multipart/form-data` with fields `issueId` and `file`
- Accepts: JPEG, PNG, WebP (max 5MB)
- Behaviour: uploads file to Supabase Storage as `{issueId}.jpg`, overwrites if exists, updates `Issue.coverImage` with the public URL
- Response: `{ url: string }`

**`DELETE /api/admin/delete-cover`**
- Auth: middleware (cookie check)
- Body: `{ issueId: string }`
- Behaviour: deletes file from Supabase Storage, sets `Issue.coverImage = null` in DB
- Response: `{ ok: true }`

### Admin Panel — `/admin/covers`

- Server component fetching all issues with `{ id, title, series { name }, coverImage }`
- Filter toggle: "Missing cover" (default) / "All issues"
- Grid layout matching existing issues grid (7→6→4→3 col)
- Each card:
  - Shows cover thumbnail if present, halftone placeholder if not
  - Issue title + series name
  - "Upload cover" button if no image; "Replace" + "Delete" buttons if image exists
- Upload/replace: click opens file picker; drag-and-drop also supported
- Optimistic UI: show spinner on card while uploading, update thumbnail on success

### Per-Issue Upload — `/issue/[id]`

- Upload/Replace/Delete buttons rendered only when `admin_session` cookie is present
- Same API calls as admin panel
- Positioned below the cover image in the existing layout

### Cover Component Update

- `Cover.tsx` currently builds src as `/covers/${coverImage}` (relative path)
- Update: if `coverImage` starts with `http`, use as-is (Supabase CDN URL); otherwise keep existing relative path behaviour
- No change to placeholder rendering

---

## New Files

| File | Purpose |
|---|---|
| `app/admin/login/page.tsx` | Password login form |
| `app/admin/covers/page.tsx` | Admin panel — issue grid with upload controls |
| `app/api/admin/upload-cover/route.ts` | Upload/replace API |
| `app/api/admin/delete-cover/route.ts` | Delete API |
| `middleware.ts` | Cookie check for /admin/* and /api/admin/* |
| `lib/supabase-storage.ts` | Supabase Storage upload/delete helpers |

---

## Modified Files

| File | Change |
|---|---|
| `app/_components/Cover/Cover.tsx` | Handle full URLs alongside relative paths |
| `app/issue/[id]/page.tsx` | Render upload controls when admin cookie present |
| `.env.local` | Add `ADMIN_PASSWORD` and `SUPABASE_SERVICE_ROLE_KEY` |

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Plain text password for admin login |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for server-side Storage operations |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (already used for CDN URLs) |

---

## Error Handling

- File too large (>5MB): 400 response, toast message to user
- Wrong file type: 400 response, toast message
- Upload fails: 500 response, toast message, no DB update
- Delete fails: 500 response, DB unchanged
- Wrong password: 401, re-show login form with error message

---

## Supabase Storage Setup (manual, before implementation)

1. Go to Supabase dashboard → Storage → New bucket
2. Name: `covers`, toggle Public on
3. Go to Settings → API → copy Service Role key → add to `.env.local`
