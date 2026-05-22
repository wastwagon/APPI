# Migration audit — legacy site → `apps/frontend`

**Date:** 2026-05-20  
**Canonical app:** `apps/frontend` (Coolify / `pnpm dev:web`)  
**Legacy reference:** removed from repo (was root `app/` + Next scaffold; use git history if needed)

## Verdict

| Area | Status |
|------|--------|
| Public marketing routes | **Complete** — all legacy programme URLs have equivalents |
| Insights listings | **Complete** — publications, press, thought leadership, events, media coverage |
| Legal (privacy / terms) | **Complete** — full multi-section text (en / fr / ar) |
| Contact & social | **Complete** — email, phone, street address, social URLs |
| Home hero & about | **Complete** — live taglines + legacy “Why APPI” bullets |
| Summit APPS 2025 | **Complete** (en); **fixed** fr/ar `content.json` in this audit |
| URL redirects | **Complete** — see table below |
| Locales | **Partial** — en / fr / ar only (legacy had +pt, es, am, sw) |
| Press “media kit” CTA block | **Complete** — `PressMediaCta` → `/contact#inquiry`, `/summit/media` |
| Root `app/` folder | **Leftover** — reference copy; safe to archive/delete |
| `content.json` → `legal.privacy/terms` briefs | **Orphan** — unused; pages use `legal-content/*` instead |

---

## Route parity (legacy → new)

| Legacy path | New path | Redirect |
|-------------|----------|----------|
| `/home` | `/` | Yes |
| `/` (legacy root) | under construction / varies | New `/` is home |
| `/contact/login` | `/member/login` | Yes |
| `/auth/login` | `/member/login` | Yes (added) |
| `/contact/forgot-password` | `/member/login` | Yes (added; no forgot-password UI yet) |
| `/contact-us` | `/contact` | Yes |
| `/about-us` | `/about` | Yes |
| `/summit/about` | `/summit` | Yes |
| `/summit/next` | `/summit/register` | Yes |
| `/accessibility` | `/accessibility` | New (not on legacy menu) |
| `/admin/*` | `/admin/*` (new admin panel) | Different implementation |
| `/test`, `/env-test`, `/debug-env` | — | Dev-only legacy; not migrated |

All programme paths in `scripts/compare-legacy-urls.sh` are implemented under `apps/frontend/src/app/[locale]/(site)/`.

---

## Content correctness

### Migrated and aligned with legacy `app/`

- **Insight catalogs** — `src/data/insights-catalog/{en,fr,ar}.ts` (same items as legacy mock data in `app/insights/*/page.tsx`).
- **Privacy / terms** — `src/data/legal-content/` + `legacy-legal-content.ts` (en source).
- **Site config** — `src/lib/site.ts` (AGC email, Ghana phone, East Legon address, social links from legacy header).
- **Home** — hero title/subtitle/tagline, about paragraphs + 5 bullets, 6 platform pillars (incl. working groups), insights cards 1–2 from press/publications catalog, card 3 APPS 2025.
- **Summit** — APPS 2025 Accra dates in `messages/en/content.json` (+ fr/ar after audit fixes).

### Known content differences (acceptable or follow-up)

1. **Mock `#` article URLs** — Legacy media coverage used `url: '#'`; new site lists stories without external links (same as live mock).
2. **Home stats** — New site shows illustrative stats + optional live API counts; legacy home had no identical counter block.
3. **Programme briefs** — Most subpages use `ProgrammeBrief` + `messages/*/content.json` (from `generate-legacy-content.mjs`), not verbatim HTML from every legacy paragraph. Substance matches; wording may differ slightly.
4. **CMS override** — Admin/CMS can replace message keys at runtime; catalogs/legal TS files are fallbacks.
5. **Forgot password** — Redirects to member login; dedicated recovery flow not built.
6. **Press media CTA** — Links to `/contact#inquiry` and `/summit/media` (legacy buttons were non-functional).

---

## Code leftovers (cleaned / remaining)

### Removed in audit

- `insights-detail.tsx` — unused (replaced by `InsightsCatalogPage`).
- `insights-list-detail.tsx` — unused (expected `content.insights.*.items.a/b/c` keys that were never added).

### Remaining (action optional)

| Item | Location | Recommendation |
|------|----------|----------------|
| Legacy Next `app/` tree | — | **Deleted** (was not in `pnpm build`). |
| `content.legal.privacy/terms` briefs | `messages/*/content.json` | Harmless; remove in a cleanup PR or repoint CMS slugs. |
| `docs/LEGACY-DECOMMISSION.md` | Says privacy/terms use “brief layout” | **Outdated** — update checklist (see below). |

---

## Locale coverage

| Legacy | New |
|--------|-----|
| en, fr, pt, es, ar, am, sw | en, fr, ar |

Insight **lists** and **legal** documents are translated for fr/ar. Programme briefs exist in `messages/fr/content.json` and `messages/ar/content.json`. Portuguese, Spanish, Amharic, and Swahili are **not** migrated unless you add locales to `src/i18n/routing.ts` and message files.

---

## Pre-launch checklist

- [ ] Deploy latest frontend to Coolify and smoke-test redirects: `/home`, `/contact/login`, `/auth/login`.
- [ ] Spot-check `/privacy`, `/terms`, `/insights/press`, `/insights/media`, `/contact/social`.
- [ ] Confirm DNS cuts from Vercel legacy to new host.
- [x] Root legacy `app/` and Next scaffold removed from repo.
- [x] Press-page “Media inquiries” CTA (`PressMediaCta`).
- [ ] (Optional) Add pt/es/am/sw locales if required for launch.

---

## Related docs

- [`CONTENT-MIGRATION.md`](./CONTENT-MIGRATION.md) — what was moved and where
- [`LEGACY-DECOMMISSION.md`](./LEGACY-DECOMMISSION.md) — decommission steps (update privacy/terms notes)
- [`scripts/compare-legacy-urls.sh`](../scripts/compare-legacy-urls.sh) — HTTP parity when both stacks run locally
