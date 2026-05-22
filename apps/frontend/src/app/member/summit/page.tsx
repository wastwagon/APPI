'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchMemberProfile, apiFetch } from '@/lib/member-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function MemberSummitPage() {
  const [form, setForm] = useState({
    organisation: '',
    country: '',
    delegationRole: '',
    dietaryNotes: '',
  })
  const [status, setStatus] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchMemberProfile().then((d) => {
      if (d.summitRegistration) {
        setForm({
          organisation: d.summitRegistration.organisation,
          country: d.summitRegistration.country,
          delegationRole: d.summitRegistration.delegationRole ?? '',
          dietaryNotes: d.summitRegistration.dietaryNotes ?? '',
        })
        setStatus(d.summitRegistration.status)
      } else if (d.profile) {
        setForm((f) => ({
          ...f,
          organisation: d.profile?.organization ?? f.organisation,
          country: d.profile?.country ?? f.country,
        }))
      }
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    setError(null)
    const res = await apiFetch('/api/v1/member/summit-registration', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ summitYear: '2025', ...form }),
    })
    const body = await res.json()
    setSaving(false)
    if (!res.ok) {
      setError(body.error ?? 'Registration failed')
      return
    }
    setMessage('Summit registration saved')
    setStatus(body.registration?.status ?? 'submitted')
  }

  return (
    <div className="max-w-xl space-y-8">
      <DashboardHeader
        title="Summit registration"
        description="Register or update your delegation for the African Political Parties Summit."
      >
        {status && <Badge variant="info">{status}</Badge>}
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <FormCard title="Delegation details" description="The secretariat will confirm your status by notification.">
          <FormField id="organisation" label="Party / organisation" required>
            <input
              id="organisation"
              required
              value={form.organisation}
              onChange={(e) => setForm({ ...form, organisation: e.target.value })}
              className="input-field"
            />
          </FormField>
          <FormField id="country" label="Country" required>
            <input
              id="country"
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="input-field"
            />
          </FormField>
          <FormField id="delegationRole" label="Delegation role">
            <input
              id="delegationRole"
              value={form.delegationRole}
              onChange={(e) => setForm({ ...form, delegationRole: e.target.value })}
              className="input-field"
            />
          </FormField>
          <FormField id="dietaryNotes" label="Dietary / accessibility notes">
            <textarea
              id="dietaryNotes"
              rows={3}
              value={form.dietaryNotes}
              onChange={(e) => setForm({ ...form, dietaryNotes: e.target.value })}
              className="input-field"
            />
          </FormField>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="error">{error}</Alert>}
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Saving…' : 'Save registration'}
          </Button>
        </FormCard>
      </form>

      <p className="text-sm text-ink-muted">
        <Link href="/summit" className="font-semibold text-accent-blue hover:underline">
          View public summit information →
        </Link>
      </p>
    </div>
  )
}
