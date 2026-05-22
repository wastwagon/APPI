import type { AppLocale } from '@/i18n/routing'

export type LocaleDisplay = {
  flag: string
  labelKey: 'en' | 'fr' | 'ar'
}

export const localeDisplay: Record<AppLocale, LocaleDisplay> = {
  en: { flag: '🇬🇧', labelKey: 'en' },
  fr: { flag: '🇫🇷', labelKey: 'fr' },
  ar: { flag: '🇸🇦', labelKey: 'ar' },
}
