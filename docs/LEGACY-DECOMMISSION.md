# Legacy site decommission checklist

Legacy stack: `APPI/source` (Docker **`appi-main-web`**, port **7200**)  
Canonical stack: **`APPI-main`** monorepo (frontend **3010**, API **4000**)

Last automated check: all marketing routes return **200** on both stacks except intentional merges below.

## Pre-delete verification (manual, ~15 min)

Open both bases side by side:

| Legacy | New |
|--------|-----|
| http://localhost:7200 | http://localhost:3010 |

Spot-check:

- [ ] Home — hero (2 slides), stats, platforms, about block, insights cards, contact strip
- [ ] `/platforms/academy` — photo + programme brief bullets
- [ ] `/contact` + `/contact/secretariat` + `/contact/mediation` + `/contact/social`
- [ ] `/faq` — 4 questions
- [ ] `/privacy` + `/terms` — full legal text (multi-section; en / fr / ar)
- [ ] Footer/nav links work

## Automated route parity

| Path | Legacy | New | Notes |
|------|--------|-----|-------|
| All programme pages (platforms, about, engagement, insights, summit) | 200 | 200 | Copy in `messages/*/content.json` |
| `/contact`, `/contact/*` | 200 | 200 | |
| `/faq` | 200 | 200 | |
| `/privacy`, `/terms` | 200 | 200 | Full legal pages (not programme-brief layout) |
| `/home` | 200 | **301→/** | Redirect in `next.config.mjs` |
| `/contact/login` | 200 | **301→/member/login** | |
| `/member/login`, `/member/register`, dashboard, settings | 200 | 200 | New auth UI (not marketing brief) |
| `/contact-us` | 200 | **301→/contact** | Redirect added in `next.config.mjs` |
| `/about-us` | 200 | **301→/about** | Template-only legacy page; redirect added |
| `/accessibility` | 404/redirect | 200 | New page (not on legacy menu) |

## Content & assets

- **Copy**: Migrated via `apps/frontend/scripts/generate-legacy-content.mjs` and `insights-catalog/` / `legal-content/` (root legacy `app/` removed from repo)
- **Images**: Real JPGs in `apps/frontend/public/images/` (legacy `remoteMedia.js` used SVG placeholders at runtime)
- **Contact**: `appi@africagovernancecentre.org`, `+233 53 054 5528` in `apps/frontend/src/lib/site.ts`

## Stop legacy Docker (completed)

Legacy project `appi-main` was removed:

- Container `appi-main-web` (port **7200**)
- Volumes `appi-main_postgres_data`, `appi-main_redis_data`
- Images `appi-main-web`, `appi-main-migrate` (~2.4 GB)

**Kept** (used by `APPI-main` dev): `appi-db`, `appi-redis`, volumes `appi_postgres_data`, `appi_redis_data`.

## Remove legacy files (completed)

Deleted:

- `/Users/OceanCyber/Downloads/APPI/source` (~717 MB)
- `/Users/OceanCyber/Downloads/APPI/APPI-main` (stale duplicate, ~64 MB)
- `/Users/OceanCyber/Downloads/APPI` (empty parent)

Canonical codebase: **`/Users/OceanCyber/Downloads/APPI-main`** only.

In-repo legacy (also removed — see [REPO-CLEANUP.md](./REPO-CLEANUP.md)):

- Root `app/` Next.js site and scaffold
- `database/` Supabase SQL + Supabase-era READMEs/scripts

## Run new stack going forward

```bash
cd /Users/OceanCyber/Downloads/APPI-main
pnpm dev          # API + DB + frontend
# or frontend only:
pnpm dev:web      # http://localhost:3010
```

Production:

```bash
pnpm compose:prod
```

## Re-run URL check anytime

```bash
bash /Users/OceanCyber/Downloads/APPI-main/scripts/compare-legacy-urls.sh
```
