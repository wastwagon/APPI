'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/contact', messageKey: 'overview' },
  { href: '/contact/secretariat', messageKey: 'secretariat' },
  { href: '/contact/mediation', messageKey: 'mediationContact' },
  { href: '/contact/social', messageKey: 'socialChannels' },
] as const

export function ContactSubnav() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <nav aria-label={t('contact')} className="flex flex-wrap gap-2">
      {links.map((link) => {
        const base = pathname.replace(/\/$/, '') || '/'
        const active =
          link.href === '/contact' ? base === '/contact' : base.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'bg-accent-blue text-white shadow-soft'
                : 'bg-paper text-ink-muted hover:bg-accent-blue/8 hover:text-accent-blue'
            )}
          >
            {t(link.messageKey)}
          </Link>
        )
      })}
    </nav>
  )
}
