'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { PageHero } from '@/components/layout/page-hero'
import { SectionBlock } from '@/components/layout/section-block'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export type EngagementFormSlug = 'parties' | 'partner' | 'youthWomen' | 'ctpeAfcta'

export function EngagementFormPage({
  slug,
  formType,
}: {
  slug: EngagementFormSlug
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
      if (!res.ok) throw new Error('Failed')
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero eyebrow={tNav('engagement')} title={t('title')} description={t('description')}>
        <Link
          href="/engagement"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-teal"
        >
          <ArrowLeft className="h-4 w-4" /> {tNav('engagement')}
        </Link>
      </PageHero>
      <SectionBlock tone="muted" className="pb-24">
        <form onSubmit={handleSubmit} className="card-premium mx-auto max-w-lg space-y-5 p-6 sm:p-8">
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <div>
            <label className="block text-sm font-medium text-ink">{tForm('organisation')}</label>
            <input name="name" required className="input-field mt-1.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">{tForm('email')}</label>
            <input name="email" type="email" required className="input-field mt-1.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">{tForm('country')}</label>
            <input name="country" className="input-field mt-1.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">{tForm('message')}</label>
            <textarea name="message" rows={4} required className="input-field mt-1.5" />
          </div>
          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? tForm('submitting') : tForm('submit')}
          </Button>
          {status === 'ok' && <p className="text-sm text-accent-teal">{tForm('success')}</p>}
          {status === 'error' && <p className="text-sm text-accent-warm">{tForm('error')}</p>}
        </form>
      </SectionBlock>
    </>
  )
}
