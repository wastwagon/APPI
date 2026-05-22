import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { AboutSubnav } from '@/components/layout/about-subnav'
import { aboutImages } from '@/lib/content-images'

export type AboutSlug =
  | 'whoWeAre'
  | 'strategicObjectives'
  | 'leadership'
  | 'framework'
  | 'declarations'

export async function AboutDetail({ slug }: { slug: AboutSlug }) {
  return (
    <ProgrammeBrief
      namespace={`content.about.${slug}`}
      eyebrowKey="about"
      imageKey={aboutImages[slug]}
      heroChildren={<AboutSubnav />}
    />
  )
}
