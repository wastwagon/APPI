import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/layout/page-hero'
import { SectionBlock } from '@/components/layout/section-block'
import { ArrowLeft } from 'lucide-react'

type InsightsSubpageProps = {
  title: string
  description: string
  items: { title: string; date: string; summary: string }[]
}

export async function InsightsSubpage({ title, description, items }: InsightsSubpageProps) {
  const tNav = await getTranslations('nav')

  return (
    <>
      <PageHero eyebrow={tNav('insights')} title={title} description={description}>
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-teal"
        >
          <ArrowLeft className="h-4 w-4" /> {tNav('insights')}
        </Link>
      </PageHero>
      <SectionBlock tone="muted" className="pb-20">
        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((item) => (
            <article key={item.title} className="card-premium p-6 sm:p-7">
              <p className="eyebrow !text-accent-teal">{item.date}</p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </SectionBlock>
    </>
  )
}
