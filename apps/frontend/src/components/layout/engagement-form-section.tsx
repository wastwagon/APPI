'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { SectionBlock } from '@/components/layout/section-block'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { ArrowLeft } from 'lucide-react'
import type { EngagementSlug } from '@/components/content/engagement-detail'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'

export function EngagementFormSection({
  slug,
  formType,
}: {
  slug: EngagementSlug
  formType: string
}) {
  const t = useTranslations(`content.engagement.${slug}`)
  const tNav = useTranslations('nav')
  const tForm = useTranslations('forms')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = {}
    data.forEach((v, k) => {
      if (k !== 'website') payload[k] = String(v)
    })
    try {
      const res = await fetch('/api/v1/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, payload, website: data.get('website') ?? '' }),
      })
      const body = await parseApiJson<{ error?: string; message?: string }>(res)
      if (!res.ok) throw new Error(apiErrorMessage(body, 'Failed'))
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionBlock tone="muted" className="pb-24">
      <Link
        href="/engagement"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-teal"
      >
        <ArrowLeft className="h-4 w-4" /> {tNav('engagement')}
      </Link>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
        <FormCard title={t('title')} description={t('description')}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <FormField id={`${slug}-name`} label={tForm('organisation')} required>
            <input id={`${slug}-name`} name="name" required className="input-field" />
          </FormField>
          <FormField id={`${slug}-email`} label={tForm('email')} required>
            <input id={`${slug}-email`} name="email" type="email" required autoComplete="email" className="input-field" />
          </FormField>
          <FormField id={`${slug}-country`} label={tForm('country')}>
            <input id={`${slug}-country`} name="country" className="input-field" />
          </FormField>
          <FormField id={`${slug}-message`} label={tForm('message')} required>
            <textarea id={`${slug}-message`} name="message" rows={4} required className="input-field" />
          </FormField>
          {status === 'ok' && <Alert variant="success">{tForm('success')}</Alert>}
          {status === 'error' && <Alert variant="error">{tForm('error')}</Alert>}
          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? tForm('submitting') : tForm('submit')}
          </Button>
        </FormCard>
      </form>
    </SectionBlock>
  )
}
