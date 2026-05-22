# APPI Full-Stack — Phased Implementation

Monorepo: **frontend** (Next.js) + **api** (Fastify) + **Postgres** + **Redis**, deployable via **Coolify** (`docker-compose.yml`).

## Local development (hot reload)

**Recommended — fast HMR (DB/Redis in Docker, apps on host):**

```bash
cp .env.example .env
pnpm install
pnpm dev
```

- Frontend: http://localhost:3010  
- API: http://localhost:4000  
- API via Next rewrite: http://localhost:3010/api/health  
- Default admin (after `pnpm db:seed`): `admin@appi.local` / see `SEED_ADMIN_PASSWORD` in `.env`  

**Full Docker dev (hot reload in containers):**

```bash
cp .env.example .env
pnpm dev:docker
```

## Production / Coolify

```bash
docker compose up -d --build
```

Set secrets in Coolify from `.env.example`. Only **frontend** is public; **api**, **db**, **redis** stay on internal network.

---

## Phase 0 — Foundation ✅ (this repo)

| Item | Status |
|------|--------|
| pnpm monorepo (`apps/*`, `packages/*`) | ✅ |
| `packages/database` Prisma + migrations | ✅ |
| `apps/api` Fastify + `/health` | ✅ |
| `apps/frontend` Next.js + API rewrites | ✅ |
| `docker-compose.yml` (prod stack) | ✅ |
| `docker-compose.dev.yml` (hot reload) | ✅ |
| Legacy site at repo root `app/` | preserved — migrate in Phase 2 |

## Phase 1 — API core ✅

- [x] `POST /api/v1/forms` + `FormSubmission` persistence
- [x] Redis rate limiting (8 req/min per IP)
- [x] Resend email on submit (when env set)
- [x] `GET /api/v1/admin/leads` (Bearer `ADMIN_API_KEY`)
- [x] JWT auth: register, login, refresh, logout, me

## Phase 2 — Premium UI shell ✅

- [x] Design tokens (IBM Plex Sans + Source Serif 4)
- [x] `AppShell`, mobile bottom nav, drawer
- [x] Home page (mobile-first)
- [x] Member login (API-backed)

## Phase 3 — Marketing pages ✅

- [x] About (all subpages + subnav)
- [x] Platforms (hub + 7 programme pages)
- [x] Insights (hub + 5 sections)
- [x] Engagement (hub + forms)
- [x] Summit (hub, register, media)
- [x] Contact, Privacy, Accessibility, Terms
- [x] Member register + dashboard
- [x] Image pipeline (WebP optimization on admin upload)
- [x] Public summit form → member `SummitRegistration` when logged in
- [x] Live homepage stats from `GET /api/v1/site/stats`

## Phase 4 — Member portal ✅

- [x] Register / login / dashboard (member shell + auth guard)
- [x] Settings: profile, avatar upload, password change
- [x] Identity verification submit + admin review API
- [x] Summit registration tied to member account (`/member/summit`)
- [ ] Admin UI for verification queue (Phase 5)

## Phase 5 — Admin ✅

- [x] Admin login (`/admin/login`) — JWT, role `admin` required
- [x] Dashboard with stats
- [x] Verification review queue
- [x] Form leads / submissions table
- [x] Members list + role management
- [x] Summit registrations list
- [x] Media library (WordPress-style): upload images/PDFs, YouTube-only video
- [x] Site mode: live vs under construction (middleware + admin toggle)
- [x] Admin settings: manual migrate + seed for failed deploys

## Phase 6 — i18n & polish

- [x] **Full CMS** — `CmsPage` in Postgres, admin **Content** editor, API bundle merged into `next-intl` (overrides `messages/*.json`)
- [x] `next-intl` EN + FR (`/fr/...` prefix, shell + home translated)
- [x] Language switcher in header / mobile drawer
- [x] Summit & insights media pages wired to media library (`summit`, `press` folders)
- [x] Premium design system (tokens, cards, heroes, hub pages)
- [x] Desktop mega-menu + premium mobile drawer
- [x] EN/FR/AR locales; AR uses RTL layout
- [x] Full detail page copy (platforms, about, insights, engagement, legal, summit)
- [x] Shared content in `messages/{locale}/content.json`
- [x] WCAG basics — skip link, focus-visible, reduced motion, form labels
- [x] Perf — CMS cache tags (10s), AVIF/WebP images, lucide tree-shake
- [x] Image WebP optimization pipeline (`sharp` on upload)
- [x] Newsletter signup (`POST /api/v1/newsletter`) + footer form
- [x] Form notification HTML emails (Resend)
- [x] In-app notification inbox + admin broadcast

## Phase 7 — Production launch

- [ ] Coolify domain + SSL
- [ ] Postgres backups
- [ ] Redirect map from old URLs
- [ ] Retire `APPI/source` template stack

---

## Repository layout

```
apps/
  frontend/     # Next.js 15 — premium UI (target)
  api/          # Fastify + Prisma
packages/
  database/     # Prisma schema & migrations
  shared/       # Shared types & Zod schemas
docker/         # Dockerfiles
app/            # LEGACY — migrate to apps/frontend in Phase 2
```
