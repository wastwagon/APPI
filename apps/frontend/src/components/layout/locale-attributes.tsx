'use client'

import { useEffect } from 'react'
import { rtlLocales, type AppLocale } from '@/i18n/routing'

export function LocaleAttributes({
  locale,
  children,
}: {
  locale: AppLocale
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  }, [locale])

  return <>{children}</>
}
