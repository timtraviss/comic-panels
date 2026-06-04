# PANELS — Comic Database

A reading-first comic book database for browsing comics by publisher → series → issue.

**Live site:** https://panels.trav-a-matic.tech  
**Admin panel:** https://panels.trav-a-matic.tech/admin/login  
**GitHub:** https://github.com/timtraviss/comic-panels

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router, TypeScript |
| ORM | Prisma 7 + `@prisma/adapter-pg` |
| Database | Supabase Postgres |
| Storage | Supabase Storage (bucket: `covers`) |
| Runtime | Node.js via NVM |
| Process | PM2 (port 3002) |
| Proxy | nginx + Let's Encrypt SSL |

---

## Local development

```bash
npm install
# Create .env.local with DATABASE_URL pointing to Supabase
npm run dev
```

Open http://localhost:3000. Cover images are served from `public/covers/` locally.

---

## Database

Powered by Supabase Postgres via Prisma 7.

```bash
# Push schema changes
npx prisma db push

# Re-seed all data (11 publishers, 55 series, 399 issues)
npx prisma db seed
```

**Prisma 7 note:** Do not add a `url` field to `datasource db` — Prisma 7 throws P1012. Runtime uses `@prisma/adapter-pg`; CLI ops use `prisma.config.ts` for the connection URL.

**Supabase free tier** pauses after ~1 week of inactivity. If the site returns 500, resume the project from the Supabase dashboard.

---

## Deploying to VPS

Changes are made locally, pushed to GitHub, then pulled onto the VPS.

**Push to GitHub:**
```bash
git push origin main
```

**Deploy on VPS:**
```bash
ssh root@187.77.130.76 "source ~/.nvm/nvm.sh && cd /var/www/panels && git pull origin main && npm run build && pm2 restart panels"
```

The build script runs `prisma generate && next build` automatically.

---

## Admin panel

Password-protected content management at `/admin`. Protected by HMAC-SHA256 cookie auth.

**Sections:**
- **Covers** — grid of all issues, upload/replace/delete cover per card
- **Issues** — list with cover thumbnails; add, edit, delete issues
- **Series** — add, edit, delete series
- **Publishers** — add, edit, delete publishers
- **Creators** — add, edit, delete creators

Cover images upload to Supabase Storage (`covers` bucket, public). nginx is configured with a 10MB upload limit for the upload endpoint.

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, publisher chips, recently-added grid |
| `/publishers` | Publisher index |
| `/publisher/[id]` | Publisher detail |
| `/series` | Series list |
| `/series/[id]` | Series detail |
| `/issues` | Issues list |
| `/issue/[id]` | Issue detail — cover, prev/next, credits, run strip |
| `/search?q=` | Search across publishers, series, issues |
| `/admin/login` | Admin login |
| `/admin/covers` | Admin cover upload panel |
| `/admin/issues` | Admin issues list |
| `/admin/series` | Admin series list |
| `/admin/publishers` | Admin publishers list |
| `/admin/creators` | Admin creators list |

---

## Phase status

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | Complete | Next.js app, all public routes, Prisma, seed data |
| Phase 2a | Complete | Cover image upload pipeline, Supabase Storage |
| Phase 2b | Complete | Full CRUD admin for issues, series, publishers, creators |
| Phase 3 | Not started | Auth, personal collections, ratings |
| Phase 4 | Not started | Creator pages, story arcs, recommendations |
