'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { X, ChevronRight, LogIn } from 'lucide-react'
import { drawerSections } from '@/config/navigation'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from './language-switcher'
import { HeaderSocial } from './header-social'

type NavDrawerProps = {
  open: boolean
  onClose: () => void
}

export function NavDrawer({ open, onClose }: NavDrawerProps) {
  const t = useTranslations('nav')
  const tShell = useTranslations('shell')

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-md"
        onClick={onClose}
        aria-label={t('closeMenu')}
      />
      <div className="absolute inset-x-0 bottom-0 top-[12%] flex flex-col overflow-hidden rounded-t-[1.75rem] bg-paper-white shadow-lift">
        <div className="flex shrink-0 items-center justify-between border-b border-edge px-5 py-4">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">{tShell('exploreTitle')}</p>
            <p className="text-xs text-ink-muted">{tShell('exploreSubtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <HeaderSocial />
            <LanguageSwitcher />
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-paper"
              aria-label={t('closeMenu')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-8">
            {drawerSections.map((section) => {
              const navItem = section.items[0]
              const childLinks =
                section.links ??
                navItem?.children ??
                (navItem ? [{ messageKey: navItem.messageKey, href: navItem.href }] : [])

              return (
                <div key={section.titleKey}>
                  <p className="eyebrow mb-3">{t(section.titleKey)}</p>
                  <ul className="space-y-1">
                    {childLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl px-3 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-paper"
                        >
                          {t(link.messageKey)}
                          <ChevronRight className="h-4 w-4 text-ink-faint" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="mt-8 space-y-3 border-t border-edge pt-6">
            <Link
              href="/member/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-xl border border-edge bg-paper px-4 py-3.5 text-sm font-semibold text-ink"
            >
              <LogIn className="h-4 w-4" />
              {tShell('memberLogin')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
