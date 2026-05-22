import { getTranslations } from 'next-intl/server'
import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { PageHero } from '@/components/layout/page-hero'
import { ContentProse } from '@/components/layout/content-prose'
import { legalImages } from '@/lib/content-images'
import { CmsHtml, cmsPlainText } from '@/components/content/cms-html'

export type LegalSlug = 'privacy' | 'terms' | 'accessibility'

export async function LegalPage({ slug }: { slug: LegalSlug }) {
  if (slug === 'accessibility') {
    const t = await getTranslations(`content.legal.${slug}`)
    return (
      <>
        <PageHero title={t('title')} description={cmsPlainText(t('description'))} />
        <ContentProse>
          <CmsHtml html={t('p1')} />
          {t.has('p2') && <CmsHtml html={t('p2')} />}
        </ContentProse>
      </>
    )
  }

  return (
    <ProgrammeBrief
      namespace={`content.legal.${slug}`}
      eyebrowKey={slug}
      imageKey={legalImages[slug]}
    />
  )
}
