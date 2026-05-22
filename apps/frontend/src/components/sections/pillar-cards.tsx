import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight, GraduationCap, Users, MessageSquare, Handshake, Building2 } from 'lucide-react'
import { SectionBlock } from '@/components/layout/section-block'
import { SectionHeader } from '@/components/layout/section-header'

const pillars = [
  { key: 'pillarSummit', descKey: 'pillarSummitDesc', href: '/platforms/summit', icon: Users },
  { key: 'pillarAcademy', descKey: 'pillarAcademyDesc', href: '/platforms/academy', icon: GraduationCap },
  { key: 'pillarReform', descKey: 'pillarReformDesc', href: '/platforms/reform-dialogues', icon: MessageSquare },
  { key: 'pillarInclusive', descKey: 'pillarInclusiveDesc', href: '/platforms/inclusive-leadership', icon: Handshake },
  { key: 'pillarAfcta', descKey: 'pillarAfctaDesc', href: '/engagement/ctpe-afcfta', icon: Building2 },
] as const

export async function PillarCards() {
  const t = await getTranslations('home')

  return (
    <SectionBlock tone="muted" className="!bg-paper">
      <SectionHeader eyebrow={t('pillarsEyebrow')} title={t('pillarsTitle')} />
      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {pillars.map((pillar, i) => (
          <Link
            key={pillar.href}
            href={pillar.href}
            className="card-premium group min-w-[min(100%,18rem)] snap-start flex-shrink-0 p-6 sm:min-w-0"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/8 text-accent-blue transition-colors group-hover:bg-accent-blue group-hover:text-white">
              <pillar.icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-ink group-hover:text-accent-blue">
              {t(pillar.key)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(pillar.descKey)}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </SectionBlock>
  )
}
