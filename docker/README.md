# Docker images

| File | Used by |
|------|---------|
| `api.Dockerfile` | Production API (+ migrations & seed via `api-entrypoint.sh`) |
| `frontend.Dockerfile` | Production Next.js |
| `migrate.Dockerfile` | Optional manual runs only (`docker compose run` — not in production compose) |
| `seed.Dockerfile` | Deprecated — seed runs inside API entrypoint |

Production compose (`docker-compose.yml`) has **4 services**: `db`, `redis`, `api`, `frontend`.

Coolify will only offer domain fields for **`api`** and **`frontend`**. Set the domain on **frontend** only.
