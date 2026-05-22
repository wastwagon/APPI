'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SectionBlock } from '@/components/layout/section-block'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'

export function ContactForm() {
  const t = useTranslations('pages.contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('/api/v1/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          payload: {
            name: data.get('name'),
            email: data.get('email'),
            message: data.get('message'),
          },
          website: data.get('website') ?? '',
        }),
      })
      const body = await parseApiJson<{ error?: string; message?: string }>(res)
      if (!res.ok) throw new Error(apiErrorMessage(body, 'Failed'))
      setStatus('ok')
      form.reset()
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

  return (
    <SectionBlock tone="muted" className="pb-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <aside className="space-y-5">
          <div className="card-premium p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-semibold text-ink">{t('officeTitle')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {t('officeDesc')} {siteConfig.locationSummary}
            </p>
          </div>
          <div className="card-premium flex items-center gap-4 p-6">
            <Mail className="h-5 w-5 shrink-0 text-accent-teal" />
            <a href={`mailto:${siteConfig.email}`} className="text-sm font-medium text-ink hover:text-accent-blue">
              {siteConfig.email}
            </a>
          </div>
          <div className="card-premium flex items-center gap-4 p-6">
            <Phone className="h-5 w-5 shrink-0 text-accent-teal" />
            <a href={`tel:${siteConfig.phoneTel}`} className="text-sm font-medium text-ink hover:text-accent-blue">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </aside>

        <form onSubmit={handleSubmit}>
          <FormCard title={t('formTitle')} description={t('officeDesc')}>
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <FormField id="name" label={t('name')} required>
              <input id="name" name="name" required className="input-field" />
            </FormField>
            <FormField id="email" label={t('email')} required>
              <input id="email" name="email" type="email" required autoComplete="email" className="input-field" />
            </FormField>
            <FormField id="message" label={t('message')} required>
              <textarea id="message" name="message" required rows={5} className="input-field" />
            </FormField>
            {status === 'ok' && <Alert variant="success">{t('success')}</Alert>}
            {status === 'error' && <Alert variant="error">{t('error')}</Alert>}
            <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? t('sending') : t('send')}
            </Button>
          </FormCard>
        </form>
      </div>
    </SectionBlock>
  )
}
