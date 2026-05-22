import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/layout/page-hero'
import { ContentProse } from '@/components/layout/content-prose'
import { CmsHtml, cmsPlainText } from '@/components/content/cms-html'
import { LegalDocumentPage } from '@/components/content/legal-document-page'
import { getPrivacyDocument, getTermsDocument } from '@/data/legal-content'
import { getLocale } from 'next-intl/server'

export type LegalSlug = 'privacy' | 'terms' | 'accessibility'

export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const locale = await getLocale()
  if (slug === 'privacy') {
    return <LegalDocumentPage document={getPrivacyDocument(locale)} />
  }
  if (slug === 'terms') {
    return <LegalDocumentPage document={getTermsDocument(locale)} />
  }

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
