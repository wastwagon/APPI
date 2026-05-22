import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/layout/page-hero'
import { SectionBlock } from '@/components/layout/section-block'
import { FaqAccordion } from '@/components/layout/faq-accordion'

export async function FaqPageContent() {
  const t = await getTranslations('content.faq')
  const tNav = await getTranslations('nav')

  const items = [1, 2, 3, 4].map((i) => ({
    id: String(i),
    question: t(`q${i}`),
    answer: t(`a${i}`),
  }))

  return (
    <>
      <PageHero eyebrow={tNav('about')} title={t('title')} description={t('description')} />
      <SectionBlock tone="white" className="pb-24">
        <FaqAccordion items={items} />
      </SectionBlock>
    </>
  )
}
