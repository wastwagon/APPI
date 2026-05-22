import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { SectionBlock } from '@/components/layout/section-block'
import { SectionHeader } from '@/components/layout/section-header'
import { legacyImages } from '@/lib/legacy-images'

const cards = [
  { key: 'card1', image: legacyImages.appiLaunch, href: '/insights/press' },
  { key: 'card2', image: legacyImages.thematicGroups, href: '/insights/publications' },
  { key: 'card3', image: legacyImages.reformDialogues, href: '/platforms/reform-dialogues' },
] as const

export async function HomeInsights() {
  const t = await getTranslations('home.insights')

  return (
    <SectionBlock tone="muted">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} className="mb-0" />
        <Link
          href="/insights"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-accent-teal sm:pb-1"
        >
          {t('viewAll')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="card-premium overflow-hidden lg:row-span-2">
          <div className="relative aspect-[16/10]">
            <Image src={cards[0].image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="p-6 sm:p-7">
            <p className="eyebrow !text-accent-teal">{t(`${cards[0].key}.badge`)}</p>
            <p className="mt-2 text-xs text-ink-faint">{t(`${cards[0].key}.date`)}</p>
            <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{t(`${cards[0].key}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`${cards[0].key}.text`)}</p>
            <Link
              href={cards[0].href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue"
            >
              {t('readMore')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
        {cards.slice(1).map((card) => (
          <article key={card.key} className="card-premium flex flex-col overflow-hidden sm:flex-row">
            <div className="relative aspect-[16/10] sm:w-2/5 sm:shrink-0">
              <Image src={card.image} alt="" fill className="object-cover" sizes="240px" />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="eyebrow !text-accent-teal">{t(`${card.key}.badge`)}</p>
              <p className="mt-1 text-xs text-ink-faint">{t(`${card.key}.date`)}</p>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{t(`${card.key}.title`)}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{t(`${card.key}.text`)}</p>
              <Link
                href={card.href}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue"
              >
                {t('readMore')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}
