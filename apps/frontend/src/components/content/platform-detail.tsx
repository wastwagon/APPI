import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { platformImages } from '@/lib/content-images'

export type PlatformSlug =
  | 'academy'
  | 'summit'
  | 'workingGroups'
  | 'reformDialogues'
  | 'inclusiveLeadership'
  | 'learningHubs'
  | 'mediation'

export async function PlatformDetail({ slug }: { slug: PlatformSlug }) {
  return (
    <ProgrammeBrief
      namespace={`content.platforms.${slug}`}
      eyebrowKey="platforms"
      imageKey={platformImages[slug]}
    />
  )
}
