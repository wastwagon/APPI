'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown, Check } from 'lucide-react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type AppLocale } from '@/i18n/routing'
import { localeDisplay } from '@/lib/locale-display'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('locale')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const current = localeDisplay[locale]

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function switchTo(next: AppLocale) {
    setOpen(false)
    if (next !== locale) router.replace(pathname, { locale: next })
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex min-w-[9.5rem] items-center justify-between gap-2 rounded-full border border-edge bg-paper-elevated px-3 py-2 text-left text-sm font-medium text-ink shadow-sm transition-all',
          'hover:border-accent-blue/35 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2',
          open && 'border-accent-blue/40 ring-2 ring-accent-blue/15'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('label')}
      >
        <span className="flex items-center gap-2">
          <span className="text-base leading-none" aria-hidden>
            {current.flag}
          </span>
          <span className="font-semibold tracking-wide">{t(current.labelKey)}</span>
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-ink-muted transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('label')}
          className="absolute right-0 z-[60] mt-2 min-w-full overflow-hidden rounded-2xl border border-edge bg-paper-white py-1 shadow-lift"
        >
          {routing.locales.map((loc) => {
            const item = localeDisplay[loc]
            const selected = loc === locale
            return (
              <li key={loc} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => switchTo(loc)}
                  className={cn(
                    'flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors',
                    selected
                      ? 'bg-accent-blue/10 font-semibold text-accent-blue'
                      : 'text-ink hover:bg-paper'
                  )}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {item.flag}
                  </span>
                  <span className="flex-1">{t(item.labelKey)}</span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
