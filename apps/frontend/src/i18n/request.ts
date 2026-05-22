import { getRequestConfig } from 'next-intl/server'
import type { AbstractIntlMessages } from 'next-intl'
import { mergeMessagesWithCms } from '@/lib/cms'
import { routing, type AppLocale } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as AppLocale)) {
    locale = routing.defaultLocale
  }

  const [base, content] = await Promise.all([
    import(`../../messages/${locale}.json`),
    import(`../../messages/${locale}/content.json`).catch(() => ({
      default: { content: {} },
    })),
  ])

  const staticMessages = { ...base.default, ...content.default }
  const messages = (await mergeMessagesWithCms(
    staticMessages as Record<string, unknown>,
    locale
  )) as AbstractIntlMessages

  return {
    locale,
    messages,
  }
})
