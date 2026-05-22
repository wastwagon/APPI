# Media library, site mode & admin operations

## Media library (WordPress-style)

### Rules
| Type | Storage | Public URL |
|------|---------|------------|
| **Image** | File on disk (`uploads/media/`) | `/uploads/media/{file}` via API |
| **Document** | File on disk | Same |
| **Video** | No file — **YouTube URL only** | External YouTube link stored in `url` |

### Usage in content
- Upload images/PDFs in **Admin → Media**
- Copy **media URL** or use **media ID** in CMS fields (future page builder)
- Pages should reference library assets, not hardcoded `/images/...` paths (migrate gradually)
- Videos: add via “Add YouTube” — never upload video files

### Folders
| Folder | Purpose |
|--------|---------|
| `heroes` | Homepage hero background (newest image in folder wins) |
| `branding` | Logos and brand assets |
| `general` | Default uploads |
| `videos` | YouTube entries (convention only) |

`pnpm db:seed` copies `appi-launch-event.jpg` → `heroes` and `appi-logo.png` → `branding` from `apps/frontend/public/images/`.

### API
- `GET /api/v1/media` — list (public read for published site optional; admin for all)
- `POST /api/v1/media` — upload image/document (admin)
- `POST /api/v1/media/youtube` — register YouTube URL (admin)
- `GET/PATCH/DELETE /api/v1/media/:id` — admin

---

## Site mode (live vs under construction)

| Mode | Public site | Admin / member / API |
|------|-------------|----------------------|
| **LIVE** | Normal routes | Always accessible |
| **UNDER_CONSTRUCTION** | Rewrites to `/under-construction` | Admin + member portals still work |

Configured in **Admin → Settings**.

---

## Deployment operations (admin)

If Coolify/Docker migrate job fails:
- **Run migrations** — `prisma migrate deploy` (admin button)
- **Run seed** — default site settings + reference data (admin button)

Both require admin JWT. Results shown in UI (success/error log).
