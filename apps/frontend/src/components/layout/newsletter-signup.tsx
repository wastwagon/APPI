'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'

export function NewsletterSignup() {
  const t = useTranslations('footer')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/v1/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      const data = await parseApiJson<{ error?: string; message?: string }>(res)
      if (!res.ok) throw new Error(apiErrorMessage(data, 'Subscription failed'))
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">{t('newsletterTitle')}</p>
      <p className="mt-1 text-sm text-white/70">{t('newsletterDesc')}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          {t('newsletterEmailLabel')}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletterPlaceholder')}
          className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
        />
        <Button type="submit" variant="secondary" disabled={status === 'loading'} className="shrink-0">
          {status === 'loading' ? t('newsletterSubmitting') : t('newsletterCta')}
        </Button>
      </div>
      {status === 'ok' && <p className="mt-2 text-sm text-accent-teal">{t('newsletterSuccess')}</p>}
      {status === 'error' && <p className="mt-2 text-sm text-red-300">{t('newsletterError')}</p>}
    </form>
  )
}
