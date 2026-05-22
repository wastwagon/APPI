import { getTranslations } from 'next-intl/server'
import { SectionBlock } from '@/components/layout/section-block'
import type { InsightListItem } from '@/data/insights-catalog'
import { ExternalLink } from 'lucide-react'

type Props = {
  items: InsightListItem[]
  /** Optional section heading (e.g. media coverage list below CMS assets) */
  heading?: string
  footnote?: string
}

export async function InsightsListSection({ items, heading, footnote }: Props) {
  const t = await getTranslations('insightsList')

  return (
    <SectionBlock tone="muted" className="pb-20">
      <div className="mx-auto max-w-3xl">
        {heading ? (
          <h2 className="font-serif text-2xl font-semibold text-ink">{heading}</h2>
        ) : null}
        <div className={`space-y-4 ${heading ? 'mt-8' : ''}`}>
          {items.map((item) => (
            <article key={item.title} className="card-premium p-6 sm:p-7">
              <p className="eyebrow !text-accent-teal">{item.date}</p>
              {(item.meta || item.source) && (
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-muted">
                  {[item.meta, item.source].filter(Boolean).join(' · ')}
                </p>
              )}
              <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-accent-teal"
                >
                  {t('readStory')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
        {footnote ? (
          <p className="mt-8 text-center text-sm text-ink-muted">{footnote}</p>
        ) : null}
      </div>
    </SectionBlock>
  )
}
