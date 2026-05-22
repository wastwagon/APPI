# APPI — African Political Parties Initiative

Full-stack monorepo: **Next.js** frontend, **Fastify** API, **Postgres**, **Redis**.

## Quick start

```bash
cp .env.example .env
pnpm install
pnpm setup          # generate Prisma client, migrate, seed (admin + media)
pnpm dev            # Docker DB/Redis + API :4000 + frontend :3010
```

| URL | Purpose |
|-----|---------|
| http://localhost:3010 | Public site |
| http://localhost:3010/admin/login | Admin dashboard (English UI only) |
| http://localhost:3010/member/login | Member portal (English UI only) |
| http://localhost:3010/en/dev/status | Stack health check |
| http://localhost:4000/health | API direct (optional) |

## Default admin (after seed)

Configured in `.env`:

| Variable | Dev default |
|----------|-------------|
| `SEED_ADMIN_EMAIL` | `admin@appi.local` |
| `SEED_ADMIN_PASSWORD` | `AdminChangeMe123!` |

| `SEED_MEMBER_EMAIL` | `member@appi.local` |
| `SEED_MEMBER_PASSWORD` | `MemberChangeMe123!` |

Sign in at **/admin/login** or **/member/login**. Re-running `pnpm db:seed` resets seeded passwords.

**Live homepage stats** come from `GET /api/v1/site/stats` (member count, summit registrations, form leads). Summit media/press folders are populated when you run seed.

## Content management (CMS)

Marketing copy is stored in **`CmsPage`** (Postgres) and merged over static JSON at request time.

| Task | Where |
|------|--------|
| Edit copy | Admin → **Content** (`/admin/content`) — visual rich text (no JSON) |
| Re-import from files | **Import from JSON files** (or `pnpm db:seed`) |
| API | `GET /api/v1/cms/bundle?locale=en` |

Slugs match translation namespaces, e.g. `content.platforms.academy`, `pages.about`. Admin **Content** lists marketing pages by default; toggle **Site chrome** for `nav`, `footer`, `home`, `forms`, etc.

In **production**, admin seed is skipped unless `SEED_ADMIN_ENABLED=true` (unset `SEED_ADMIN_PASSWORD` or use strong secrets).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Infra + API + frontend (hot reload) |
| `pnpm setup` | `db:generate` → `db:migrate:dev` → `db:seed` |
| `pnpm db:seed` | Site settings, default admin, media library |
| `pnpm db:studio` | Prisma Studio |
| `pnpm compose:prod` | Full Docker production stack |

## API proxy

The browser calls `/api/v1/*` on the frontend; Next.js rewrites to `API_INTERNAL_URL` (default `http://localhost:4000`). No `NEXT_PUBLIC_API_URL` wiring is required for local dev.

## Deploy on VPS (Coolify + Docker Compose)

Full stack in one compose file: **frontend**, **API**, **Postgres**, **Redis**.

| Step | Action |
|------|--------|
| 1 | Push to [github.com/wastwagon/APPI](https://github.com/wastwagon/APPI) (see [docs/DEPLOY-COOLIFY.md](./docs/DEPLOY-COOLIFY.md)) |
| 2 | Coolify → **Docker Compose** → this repo → `docker-compose.yml` |
| 3 | Copy env from [`.env.coolify.example`](./.env.coolify.example) |
| 4 | Coolify: domain on **frontend** only (leave **api** domain empty) |
| 5 | First deploy: `SEED_ADMIN_ENABLED=true`, then set to `false` |

```bash
# Optional: test production compose locally
cp .env.coolify.example .env   # edit passwords/URLs
docker compose up -d --build
```

## Docs

- [docs/DEPLOY-COOLIFY.md](./docs/DEPLOY-COOLIFY.md) — GitHub Desktop + Coolify setup
- [PHASES.md](./PHASES.md) — implementation roadmap
- [docs/I18N.md](./docs/I18N.md) — locales (EN / FR / AR)
- [docs/LEGACY-DECOMMISSION.md](./docs/LEGACY-DECOMMISSION.md) — migration from legacy stack
