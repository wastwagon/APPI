import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { insightsImages } from '@/lib/content-images'

export type InsightsSlug =
  | 'publications'
  | 'thoughtLeadership'
  | 'events'
  | 'press'
  | 'media'

export async function InsightsDetail({ slug }: { slug: InsightsSlug }) {
  return (
    <ProgrammeBrief
      namespace={`content.insights.${slug}`}
      eyebrowKey="insights"
      imageKey={insightsImages[slug]}
    />
  )
}
