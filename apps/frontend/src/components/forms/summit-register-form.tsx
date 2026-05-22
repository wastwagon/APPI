'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getAccessToken } from '@/lib/auth-client'
import { fetchMemberProfile, apiFetch } from '@/lib/member-api'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'
import { SectionBlock } from '@/components/layout/section-block'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'

export function SummitRegisterForm() {
  const t = useTranslations('content.summit.register')
  const tForm = useTranslations('forms')
  const [loggedIn, setLoggedIn] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [defaults, setDefaults] = useState({ name: '', email: '', organisation: '', country: '' })

  useEffect(() => {
    const token = getAccessToken()
    setLoggedIn(!!token)
    if (!token) return
    fetchMemberProfile()
      .then((d) => {
        setDefaults({
          name: d.fullName ?? '',
          email: d.email,
          organisation:
            d.summitRegistration?.organisation ??
            d.profile?.organization ??
            d.profile?.partyAffiliation ??
            '',
          country: d.summitRegistration?.country ?? d.profile?.country ?? '',
        })
      })
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)
    const data = new FormData(e.currentTarget)
    const organisation = String(data.get('organisation') ?? '')
    const country = String(data.get('country') ?? '')

    try {
      if (loggedIn) {
        const res = await apiFetch('/api/v1/member/summit-registration', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            summitYear: '2025',
            organisation,
            country,
            delegationRole: String(data.get('delegationRole') ?? '') || undefined,
            dietaryNotes: String(data.get('dietaryNotes') ?? '') || undefined,
          }),
        })
        const body = await parseApiJson<{ error?: string; message?: string }>(res)
        if (!res.ok) throw new Error(apiErrorMessage(body, 'Registration failed'))
      } else {
        const payload: Record<string, string> = {}
        data.forEach((v, k) => {
          if (k !== 'website') payload[k] = String(v)
        })
        const res = await fetch('/api/v1/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formType: 'summit-register', payload, website: '' }),
        })
        const body = await parseApiJson<{ error?: string; message?: string }>(res)
        if (!res.ok) throw new Error(apiErrorMessage(body, 'Submission failed'))
      }
      setStatus('ok')
      e.currentTarget.reset()
      if (loggedIn) setDefaults((d) => ({ ...d, organisation, country }))
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : tForm('error'))
    }
  }

  return (
    <SectionBlock tone="muted" className="pb-24">
      {loggedIn && (
        <Alert variant="info" className="mb-8 max-w-lg mx-auto">
          {t('memberHint')}{' '}
          <Link href="/member/summit" className="font-semibold text-accent-blue hover:underline">
            {t('memberLink')}
          </Link>
          {' · '}
          {t('memberSubmitNote')}
        </Alert>
      )}
      <form
        key={loggedIn ? `member-${defaults.email}` : 'guest'}
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg"
      >
        <FormCard title={t('formTitle')} description={t('formDescription')}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          {!loggedIn && (
            <>
              <FormField id="summit-name" label={tForm('fullName')} required>
                <input id="summit-name" name="name" required defaultValue={defaults.name} className="input-field" />
              </FormField>
              <FormField id="summit-email" label={tForm('email')} required>
                <input
                  id="summit-email"
                  name="email"
                  type="email"
                  required
                  defaultValue={defaults.email}
                  autoComplete="email"
                  className="input-field"
                />
              </FormField>
            </>
          )}
          <FormField id="summit-org" label={tForm('partyOrg')} required>
            <input
              id="summit-org"
              name="organisation"
              required
              defaultValue={defaults.organisation}
              className="input-field"
            />
          </FormField>
          <FormField id="summit-country" label={tForm('country')} required>
            <input
              id="summit-country"
              name="country"
              required
              defaultValue={defaults.country}
              className="input-field"
            />
          </FormField>
          {loggedIn && (
            <>
              <FormField id="summit-role" label={tForm('delegationRole')} hint={tForm('delegationRolePlaceholder')}>
                <input id="summit-role" name="delegationRole" className="input-field" />
              </FormField>
              <FormField id="summit-dietary" label={tForm('dietaryNotes')}>
                <textarea id="summit-dietary" name="dietaryNotes" rows={3} className="input-field" />
              </FormField>
            </>
          )}
          {status === 'ok' && (
            <Alert variant="success">
              {loggedIn ? tForm('registrationSaved') : tForm('registerSuccess')}
            </Alert>
          )}
          {status === 'error' && <Alert variant="error">{errorMsg ?? tForm('error')}</Alert>}
          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading'
              ? tForm('submitting')
              : loggedIn
                ? tForm('submitRegistration')
                : tForm('submitInterest')}
          </Button>
        </FormCard>
      </form>
    </SectionBlock>
  )
}
