import { InsightsSubpage } from '@/components/layout/insights-subpage'
import { getTranslations } from 'next-intl/server'

export type InsightsListSlug = 'publications' | 'thoughtLeadership' | 'events' | 'press'

export async function InsightsListDetail({ slug }: { slug: InsightsListSlug }) {
  const t = await getTranslations(`content.insights.${slug}`)

  const items = (['a', 'b', 'c'] as const).map((key) => ({
    title: t(`items.${key}.title`),
    date: t(`items.${key}.date`),
    summary: t(`items.${key}.summary`),
  }))

  return <InsightsSubpage title={t('title')} description={t('description')} items={items} />
}
