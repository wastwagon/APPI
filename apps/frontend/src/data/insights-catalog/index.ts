import type { AppLocale } from '@/i18n/routing'
import { arCatalog } from './ar'
import { enCatalog } from './en'
import { frCatalog } from './fr'
import type { InsightListItem, InsightsCatalogSlug } from './types'

const catalogs: Record<AppLocale, Record<InsightsCatalogSlug, InsightListItem[]>> = {
  en: enCatalog,
  fr: frCatalog,
  ar: arCatalog,
}

export function getInsightsCatalog(
  slug: InsightsCatalogSlug,
  locale: string
): InsightListItem[] {
  const pack = catalogs[locale as AppLocale] ?? enCatalog
  return pack[slug] ?? enCatalog[slug]
}

export type { InsightListItem, InsightsCatalogSlug }
