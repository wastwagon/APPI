import { fetchCmsBundle } from '@/lib/cms'
import {
  getInsightsCatalog,
  type InsightListItem,
  type InsightsCatalogSlug,
} from '@/data/insights-catalog'

function parseListItems(raw: unknown): InsightListItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row) => ({
      title: String(row.title ?? '').trim(),
      date: String(row.date ?? '').trim(),
      summary: String(row.summary ?? '').trim(),
      meta: row.meta ? String(row.meta) : undefined,
      source: row.source ? String(row.source) : undefined,
      href: row.href ? String(row.href) : undefined,
    }))
    .filter((item) => item.title.length > 0)
}

/** CMS slug for insights catalog pages, e.g. content.insights.publications */
export function insightsCmsSlug(catalogSlug: InsightsCatalogSlug): string {
  return `content.insights.${catalogSlug}`
}

export async function resolveInsightsCatalog(
  catalogSlug: InsightsCatalogSlug,
  locale: string
): Promise<InsightListItem[]> {
  const slug = insightsCmsSlug(catalogSlug)
  const bundle = await fetchCmsBundle(locale)
  const page = bundle?.pages?.[slug]
  const fromCms = parseListItems(page?.listItems)
  if (fromCms.length > 0) return fromCms
  return getInsightsCatalog(catalogSlug, locale)
}
