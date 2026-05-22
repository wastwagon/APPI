import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { InsightsListSection } from '@/components/content/insights-list-section'
import { resolveInsightsCatalog } from '@/lib/insights-cms'
import type { InsightsCatalogSlug } from '@/data/insights-catalog'
import { insightsImages } from '@/lib/content-images'
import { getLocale } from 'next-intl/server'

type InsightsBriefSlug = keyof typeof insightsImages

const briefSlugByCatalog: Record<InsightsCatalogSlug, InsightsBriefSlug> = {
  publications: 'publications',
  press: 'press',
  thoughtLeadership: 'thoughtLeadership',
  events: 'events',
  media: 'media',
}

type Props = {
  catalogSlug: InsightsCatalogSlug
}

export async function InsightsCatalogPage({ catalogSlug }: Props) {
  const locale = await getLocale()
  const briefSlug = briefSlugByCatalog[catalogSlug]
  const items = await resolveInsightsCatalog(catalogSlug, locale)

  return (
    <>
      <ProgrammeBrief
        namespace={`content.insights.${briefSlug}`}
        eyebrowKey="insights"
        imageKey={insightsImages[briefSlug]}
        compact
      />
      <InsightsListSection items={items} />
    </>
  )
}
