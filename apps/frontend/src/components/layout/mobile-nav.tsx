'use client'

import { useTranslations } from 'next-intl'
import { mobileTabs } from '@/config/navigation'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type MobileNavProps = {
  onMoreClick: () => void
}

export function MobileNav({ onMoreClick }: MobileNavProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-edge/80 bg-paper-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_-8px_rgba(15,20,25,0.1)] backdrop-blur-xl lg:hidden"
      aria-label="Mobile"
    >
      <div className="mx-auto flex h-[3.75rem] max-w-lg items-stretch justify-around px-1">
        {mobileTabs.map((tab) => {
          const isMore = tab.href === '#menu'
          const active =
            !isMore &&
            (pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href)))

          if (isMore) {
            return (
              <button
                key={tab.messageKey}
                type="button"
                onClick={onMoreClick}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-semibold text-ink-muted"
              >
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                    'bg-paper text-ink'
                  )}
                >
                  <tab.icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                </span>
                <span>{t(tab.messageKey)}</span>
              </button>
            )
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-semibold transition-colors',
                active ? 'text-accent-blue' : 'text-ink-muted'
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                  active && 'bg-accent-blue/10'
                )}
              >
                <tab.icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
              </span>
              <span>{t(tab.messageKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
