# Deploy APPI on a VPS with Coolify (Docker Compose)

This repo is ready for [Coolify](https://coolify.io) **Docker Compose** deployment: **frontend**, **API**, **Postgres**, and **Redis** in one stack.

Repository: **https://github.com/wastwagon/APPI**

---

## 1. Push the project to GitHub (GitHub Desktop)

1. Open **GitHub Desktop** → **File → Add Local Repository**.
2. Choose this folder: `APPI-main` (or rename it to `APPI`).
3. If prompted “not a git repository”, click **create a repository**.
4. Summary message example: `Initial APPI stack for Coolify`.
5. Click **Commit to main**.
6. **Repository → Repository Settings → Remote**  
   - Primary remote URL: `https://github.com/wastwagon/APPI.git`
7. **Publish repository** (or **Push origin**) to `wastwagon/APPI`.

Do **not** commit `.env` — it is in `.gitignore`. Only `.env.example` and `.env.coolify.example` are tracked.

---

## 2. Create the stack in Coolify

1. In Coolify: **+ New Resource** → **Docker Compose**.
2. **Source**: GitHub → connect account → select **`wastwagon/APPI`**.
3. **Branch**: `main`.
4. **Docker Compose location**: `docker-compose.yml` (repository root).
5. **Build**: Coolify builds images on the server (first deploy may take several minutes).

---

## 3. Environment variables

In Coolify → your compose resource → **Environment Variables**, paste from [`.env.coolify.example`](../.env.coolify.example) and set real values.

| Variable | Required | Notes |
|----------|----------|--------|
| `POSTGRES_PASSWORD` | Yes | Strong password |
| `DATABASE_URL` | Yes | Must use host **`db`**: `postgresql://appi:PASSWORD@db:5432/appi?schema=public` |
| `JWT_SECRET` | Yes | ≥ 32 characters |
| `JWT_REFRESH_SECRET` | Yes | ≥ 32 characters |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://your-domain` |
| `NEXT_PUBLIC_API_URL` | Yes | Same as site URL (browser uses frontend proxy) |
| `CORS_ORIGIN` | Yes | Same as site URL |
| `SEED_ADMIN_ENABLED` | First deploy | `true` once, then `false` |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | First deploy | Admin login |
| `RESEND_API_KEY` | Optional | Form emails |

**Do not** override `API_INTERNAL_URL` in Coolify unless you know what you’re doing; compose sets `http://api:4000` for the frontend container.

---

## 4. Domain and routing

1. In Coolify, open the **frontend** service (only this service should be public).
2. Assign your domain (e.g. `appi.yourdomain.org`) to **port 3000**.
3. Enable **HTTPS** (Let’s Encrypt) in Coolify.
4. The API is **not** exposed publicly; the Next.js app proxies `/api/v1/*` and `/uploads/*` to the API container.

---

## 5. First deploy checklist

1. Set all required env vars (see above).
2. Set `SEED_ADMIN_ENABLED=true` and admin email/password.
3. Deploy / **Redeploy**.
4. Wait for services: `db` → `migrate` → `seed` → `api` → `frontend` (all healthy).
5. Open `https://your-domain/admin/login` and sign in.
6. Set `SEED_ADMIN_ENABLED=false` and redeploy (stops re-seeding on every deploy).

---

## 6. Volumes (data persistence)

Coolify should keep these named volumes:

| Volume | Purpose |
|--------|---------|
| `postgres_data` | Database |
| `redis_data` | Redis |
| `uploads_data` | Uploaded media (API + seed) |

Back up `postgres_data` regularly on your VPS.

---

## 7. Local production test (optional)

```bash
cp .env.coolify.example .env
# Edit .env with local passwords and URLs

docker compose up -d --build
```

Site: http://localhost:3000 (or `COOLIFY_PORT`).

---

## 8. Troubleshooting

| Issue | What to check |
|-------|----------------|
| Build fails | Coolify build logs; ensure `pnpm-lock.yaml` is committed |
| `migrate` exits with error | `DATABASE_URL` host must be `db`, not `localhost` |
| 502 / unhealthy frontend | API health: `docker compose logs api`; wait for `seed` + `migrate` to finish |
| Admin login fails | Was `SEED_ADMIN_ENABLED=true` on first deploy? Password in Coolify env |
| CORS errors | `CORS_ORIGIN` must match `NEXT_PUBLIC_SITE_URL` exactly (https, no trailing slash) |
| Uploads missing after redeploy | Ensure `uploads_data` volume is attached to **api** |

---

## 9. Updates

1. Push changes to GitHub (GitHub Desktop → **Push origin**).
2. In Coolify → **Redeploy** the compose stack.
3. `migrate` runs on each deploy (applies new Prisma migrations).
4. Keep `SEED_ADMIN_ENABLED=false` after the first deploy.

---

## Stack diagram

```text
Internet → Coolify proxy (HTTPS)
              → frontend:3000 (Next.js)
                    → /api/v1/*  → api:4000 (Fastify)
                    → /uploads/* → api:4000
              api → db:5432 (Postgres)
              api → redis:6379 (Redis)
```
