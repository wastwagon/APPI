# Content migration (legacy → `apps/frontend`)

This document tracks copy and catalog content moved from the live Vercel site (`app/`) and [africanpoliticalpartiesinitiative.org](https://www.africanpoliticalpartiesinitiative.org) into the new Next.js frontend.

## Migrated in code

| Area | Source | New location |
|------|--------|--------------|
| Publications, press, thought leadership, events listings | Legacy insights pages (git history) | `apps/frontend/src/data/insights-catalog/{en,fr,ar}.ts` + `InsightsCatalogPage` |
| Press media inquiries CTA | Legacy press footer (git history) | `PressMediaCta` on `/insights/press` |
| Privacy & terms (full text) | Legacy privacy/terms (git history) | `apps/frontend/src/data/legacy-legal-content.ts` + `LegalDocumentPage` |
| Contact email, phone, address, social | Legacy header (git history) | `apps/frontend/src/lib/site.ts`, footer |
| Home hero taglines | Legacy home page (git history) | `apps/frontend/messages/en.json` (`home.title`, `subtitle`, `tagline`) |
| Home insights cards | Live press + publications | `en.json` `home.insights.card1/2` |
| Sixth strategic pillar (working groups) | `app/home/page.tsx` | `pillar-cards.tsx` + `en.json` |
| APPS 2025 Accra dates | Live summit pages | `messages/en/content.json` → `summit.main`, `summit.register` |
| URL cutover | Live paths `/home`, `/contact/login`, etc. | `apps/frontend/next.config.mjs` redirects |

## Locale-aware catalogs (en / fr / ar)

- Insight listings: `apps/frontend/src/data/insights-catalog/{en,fr,ar}.ts` via `getInsightsCatalog(slug, locale)`
- Legal (privacy & terms): `apps/frontend/src/data/legal-content/{fr,ar}.ts` via `getPrivacyDocument` / `getTermsDocument`
- Home about copy and hero taglines synced in `messages/{en,fr,ar}.json`

## Still CMS / translation optional

- **Programme briefs** in `messages/fr/content.json` and `messages/ar/content.json` can diverge from CMS edits independently of catalogs.
- **Admin CMS**: Long-form pages can be edited in the admin panel; static catalogs are fallbacks until publications are seeded in the database.
- **Media coverage** (`/insights/media`): Brief only; no legacy item list.

## Re-sync from legacy repo

Legacy `app/` source was removed from the repo; refresh catalogs from git history or the live site if needed:

```bash
# Compare URLs (legacy vs new routes)
./scripts/compare-legacy-urls.sh

# Regenerate programme briefs from legacy TS (if used)
node apps/frontend/scripts/generate-legacy-content.mjs
```

Then update `insights-catalog/*.ts` / `legal-content/*.ts` manually or extend the script to emit those files.

## Launch checklist

1. Deploy frontend with redirects above.
2. Point DNS from Vercel to Coolify (or reverse proxy).
3. `SEED_ADMIN_ENABLED=true` once, then `false`.
4. Verify `/home` → `/`, member login, insights lists, privacy/terms.
5. Translate fr/ar listings if required before decommissioning legacy locales.
