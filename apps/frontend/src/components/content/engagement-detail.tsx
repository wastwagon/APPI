import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { EngagementFormSection } from '@/components/layout/engagement-form-section'
import { engagementImages } from '@/lib/content-images'

export type EngagementSlug = 'parties' | 'partner' | 'youthWomen' | 'ctpeAfcta'

const formTypes: Record<EngagementSlug, string> = {
  parties: 'engagement-parties',
  partner: 'engagement-partner',
  youthWomen: 'engagement-youth-women',
  ctpeAfcta: 'engagement-ctpe-afcfta',
}

export async function EngagementDetail({ slug }: { slug: EngagementSlug }) {
  return (
    <>
      <ProgrammeBrief
        namespace={`content.engagement.${slug}`}
        eyebrowKey="engagement"
        imageKey={engagementImages[slug]}
      />
      <EngagementFormSection slug={slug} formType={formTypes[slug]} />
    </>
  )
}
