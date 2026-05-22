export type InsightListItem = {
  title: string
  date: string
  summary: string
  meta?: string
  source?: string
  href?: string
}

export type InsightsCatalogSlug =
  | 'publications'
  | 'press'
  | 'thoughtLeadership'
  | 'events'
  | 'media'
