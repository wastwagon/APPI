import type { ReactNode } from 'react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from './page-hero'
import { SectionBlock } from './section-block'
import { Button } from '@/components/ui/button'
import { legacyImages, type LegacyImageKey } from '@/lib/legacy-images'
import { CmsHtml, cmsPlainText } from '@/components/content/cms-html'

export type ProgrammeBriefProps = {
  namespace: string
  /** e.g. platforms → nav.platforms */
  eyebrowKey: string
  imageKey: LegacyImageKey
  heroChildren?: ReactNode
  /** Hide duplicate title block (e.g. when only showing image + bullets below a hub hero) */
  compact?: boolean
}

export async function ProgrammeBrief({
  namespace,
  eyebrowKey,
  imageKey,
  heroChildren,
  compact = false,
}: ProgrammeBriefProps) {
  const t = await getTranslations(namespace)
  const tNav = await getTranslations('nav')
  const tBrief = await getTranslations('content.brief')

  const bullets = [1, 2, 3, 4, 5].filter((i) => t.has(`bullet${i}`))

  const ctaHref = t.has('ctaHref') ? t('ctaHref') : '/contact'
  const secondaryHref = t.has('secondaryCtaHref') ? t('secondaryCtaHref') : '/platforms'

  return (
    <>
      {!compact && (
        <PageHero eyebrow={tNav(eyebrowKey)} title={t('title')} description={cmsPlainText(t('lead'))}>
          {heroChildren}
        </PageHero>
      )}
      <SectionBlock tone="white" className="pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">{tBrief('eyebrow')}</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {t('title')}
            </h2>
            <CmsHtml
              html={t('lead')}
              className="mt-4 text-base text-ink-muted sm:text-lg"
            />
            {bullets.length > 0 && (
              <>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-accent-teal">
                  {tBrief('outcomesTitle')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {bullets.map((i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-ink-muted sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-warm rtl:order-2" />
                      <CmsHtml as="span" html={t(`bullet${i}`)} className="flex-1 text-sm sm:text-base" />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {[1, 2].filter((i) => t.has(`externalLink${i}Href`)).length > 0 && (
              <ul className="mt-6 space-y-2">
                {[1, 2].map((i) =>
                  t.has(`externalLink${i}Href`) ? (
                    <li key={i}>
                      <a
                        href={t(`externalLink${i}Href`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-accent-blue hover:text-accent-teal"
                      >
                        {t(`externalLink${i}Label`)}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {t.has('cta') && (
                <Button asChild variant="primary">
                  <Link href={ctaHref}>{t('cta')}</Link>
                </Button>
              )}
              {t.has('secondaryCta') && (
                <Button asChild variant="secondary">
                  <Link href={secondaryHref}>{t('secondaryCta')}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-edge shadow-card">
            <Image
              src={legacyImages[imageKey]}
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={imageKey === 'appiLaunch' || imageKey === 'summit'}
            />
          </div>
        </div>
      </SectionBlock>
    </>
  )
}
