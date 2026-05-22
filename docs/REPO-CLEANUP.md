# Repository cleanup (legacy removal)

The monorepo previously contained two stacks. Only **`apps/frontend` + `apps/api` + `packages/*`** are active.

## Removed from the repo

| Path | Was |
|------|-----|
| `app/`, `components/`, `lib/`, `public/` (root), etc. | Old Next.js marketing site (Vercel) |
| `database/` | Supabase SQL scripts (pre-Prisma) |
| `ADMIN_SETUP.md`, `BACKEND_README.md`, `DATABASE_SETUP*.md`, `DEPLOYMENT.md`, `SUPABASE_SETUP.md`, `WEBSITE_README.md` | Supabase / Vercel era docs |
| `scripts/setup-database.js`, `scripts/create-admin-user.js` | Supabase setup helpers |

## Use instead

| Task | Command / doc |
|------|----------------|
| Local dev | `pnpm dev` — [README.md](../README.md) |
| Database | `pnpm setup` / `packages/database` (Prisma) |
| Deploy | [DEPLOY-COOLIFY.md](./DEPLOY-COOLIFY.md) |
| Content migration | [CONTENT-MIGRATION.md](./CONTENT-MIGRATION.md), [MIGRATION-AUDIT.md](./MIGRATION-AUDIT.md) |

Recover deleted files from git history if needed: `git log --all --full-history -- app/` or `-- database/`.
