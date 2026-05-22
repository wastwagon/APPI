# Admin enhancements (three phases)

## Phase 1 — Media in CMS and rich text

- **Media picker** (`MediaPickerDialog`): pick images from the media library.
- **Rich text**: TipTap Image extension + “Insert image from library” in `RichTextEditor`.
- **CMS URL fields**: keys ending in `ImageUrl`, `imageUrl`, `mediaUrl`, etc. use `CmsMediaUrlField` (URL + pick from library).
- **Public HTML**: `CmsHtml` allows sanitized `<img>` tags.

## Phase 2 — Leads workflow

- **Database**: `FormSubmission.status` (`NEW` | `READ` | `ARCHIVED`) and `readAt`.
- **API**:
  - `GET /api/v1/admin/leads?formType=&status=&limit=`
  - `PATCH /api/v1/admin/leads/:id` — body `{ "status": "new" | "read" | "archived" }`
  - `GET /api/v1/admin/leads/export` — CSV download (same filters)
- **Admin UI** (`/admin/leads`): filters, status badges, mark read / archive / reopen, export CSV.

**Deploy:** run migrations after deploy:

```bash
pnpm db:migrate:deploy
```

## Phase 3 — CMS-driven insights lists

- **Public site**: `resolveInsightsCatalog()` reads `listItems` from CMS page `content.insights.{slug}`; falls back to static `src/data/insights-catalog/`.
- **Admin CMS**: when editing `content.insights.publications`, `press`, `events`, etc., a **Catalog items** editor appears to add/reorder list entries.

To seed lists: import CMS JSON or add `listItems` in admin, then publish.
