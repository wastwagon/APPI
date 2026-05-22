# APPI Stack — Local dev & deploy

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop (for Postgres + Redis, optional full Docker dev)

## Quick start (hot reload — recommended)

```bash
cp .env.example .env
pnpm install
pnpm db:generate

# Start Postgres + Redis only
pnpm dev:infra

# Run migrations (first time)
pnpm db:migrate:deploy

# API + Frontend with HMR (two terminals or one via concurrently)
pnpm dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3010 |
| API direct | http://localhost:4000/health |
| API via Next | http://localhost:3010/api/health |
| Prisma Studio | `pnpm db:studio` |

Edit `apps/frontend/src` or `apps/api/src` — changes reload instantly.

### Admin access

1. Register a user at `/member/register`
2. Promote to admin:

```bash
DATABASE_URL="postgresql://appi:change_me_local@127.0.0.1:5437/appi?schema=public" \
  pnpm --filter @appi/api promote-admin your@email.com
```

3. Sign in at http://localhost:3010/admin/login

### Member portal (Phase 4)

| URL | Purpose |
|-----|---------|
| http://localhost:3010/member/register | Create account |
| http://localhost:3010/member/login | Sign in |
| http://localhost:3010/member/dashboard | Dashboard |
| http://localhost:3010/member/settings | Profile, verification, password |
| http://localhost:3010/member/summit | Summit registration (saved to DB) |

**Promote an admin user** (SQL after migrate):

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

Admin verification API: `GET /api/v1/admin/verifications`, `POST /api/v1/admin/verifications/:id/review` with Bearer token (admin role).

## Full Docker dev (hot reload in containers)

```bash
cp .env.example .env
pnpm dev:docker
```

Same URLs. Source folders are volume-mounted into containers.

## Production / Coolify

```bash
# Set strong secrets in .env or Coolify UI
docker compose up -d --build
```

Expose port **3000** on `frontend` only. Set `DATABASE_URL`, `JWT_*`, `POSTGRES_PASSWORD` in Coolify.

## Legacy site

The original Next.js app remains at repo root (`app/`, `components/`). It is **not** started by `pnpm dev`. Migrate pages into `apps/frontend` per `PHASES.md`.
