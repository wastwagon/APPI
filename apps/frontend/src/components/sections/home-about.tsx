import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SectionBlock } from '@/components/layout/section-block'
import { legacyImages } from '@/lib/legacy-images'

const aboutPoints = ['aboutPoint1', 'aboutPoint2', 'aboutPoint3', 'aboutPoint4', 'aboutPoint5'] as const

export async function HomeAbout() {
  const t = await getTranslations('home')
  const points = aboutPoints.filter((key) => t.has(key))

  return (
    <SectionBlock tone="white" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-edge shadow-card">
            <Image
              src={legacyImages.homeAboutLarge}
              alt="Leaders in discussion at a continental meeting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 w-2/5 overflow-hidden rounded-xl border border-edge shadow-soft sm:-right-8">
            <div className="relative aspect-[4/3]">
              <Image
                src={legacyImages.homeAboutSmall}
                alt="Working group session"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>
          <div className="absolute left-4 top-4 rounded-xl bg-accent-blue px-4 py-3 text-white shadow-lift sm:left-6 sm:top-6">
            <p className="text-sm font-semibold">
              <strong>APPI</strong> {t('aboutBadge')}
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t('aboutTitle')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{t('aboutLead')}</p>
          {t.has('aboutPara2') && (
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{t('aboutPara2')}</p>
          )}
          {t.has('aboutPara3') && (
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{t('aboutPara3')}</p>
          )}
          {points.length > 0 && (
            <ul className="mt-8 space-y-3">
              {points.map((key) => (
                <li key={key} className="flex gap-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-warm" />
                  {t(key)}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/about"
              className="card-premium p-5 transition-colors hover:border-accent-blue/30"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">{t('aboutFeature1')}</h3>
            </Link>
            <Link
              href="/platforms"
              className="card-premium p-5 transition-colors hover:border-accent-blue/30"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">{t('aboutFeature2')}</h3>
            </Link>
          </div>
        </div>
      </div>
    </SectionBlock>
  )
}
