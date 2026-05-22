'use client'

import { useTranslations } from 'next-intl'
import { aboutNav } from '@/config/about-nav'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export function AboutSubnav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="About sections"
    >
      {aboutNav.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
              active
                ? 'bg-accent-blue text-white shadow-soft'
                : 'bg-paper text-ink-muted hover:bg-edge/50 hover:text-ink'
            )}
          >
            {item.messageKey === 'overview' ? t('overview') : t(item.messageKey)}
          </Link>
        )
      })}
    </nav>
  )
}
