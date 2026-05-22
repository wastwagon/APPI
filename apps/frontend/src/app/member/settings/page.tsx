'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { fetchMemberProfile, apiFetch, type MemberProfile } from '@/lib/member-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { TabList } from '@/components/ui/tab-list'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { Camera, Shield } from 'lucide-react'

const tabs = [
  { id: 'profile' as const, label: 'Profile' },
  { id: 'verification' as const, label: 'Verification' },
  { id: 'security' as const, label: 'Security' },
]

type TabId = (typeof tabs)[number]['id']

function SettingsContent() {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') as TabId) || 'profile'
  const [tab, setTab] = useState<TabId>(initialTab)
  const [data, setData] = useState<MemberProfile | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const avatarRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    position: '',
    organization: '',
    partyAffiliation: '',
    country: '',
    bio: '',
  })

  const [verification, setVerification] = useState({ nationalId: '' })
  const [docFile, setDocFile] = useState<File | null>(null)
  const [passwords, setPasswords] = useState({ current: '', next: '' })

  function load() {
    fetchMemberProfile().then((d) => {
      setData(d)
      setProfile({
        fullName: d.fullName ?? '',
        phone: d.profile?.phone ?? '',
        position: d.profile?.position ?? '',
        organization: d.profile?.organization ?? '',
        partyAffiliation: d.profile?.partyAffiliation ?? '',
        country: d.profile?.country ?? '',
        bio: d.profile?.bio ?? '',
      })
    })
  }

  useEffect(() => {
    load()
  }, [])

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    const res = await apiFetch('/api/v1/member/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    if (!res.ok) {
      setError('Failed to save profile')
      return
    }
    setMessage('Profile saved')
    load()
  }

  async function uploadAvatar(file: File) {
    setError(null)
    const form = new FormData()
    form.append('file', file)
    const res = await apiFetch('/api/v1/member/avatar', { method: 'POST', body: form })
    if (!res.ok) {
      setError('Avatar upload failed')
      return
    }
    setMessage('Photo updated')
    load()
  }

  async function submitVerification(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    const form = new FormData()
    form.append('nationalId', verification.nationalId)
    if (docFile) form.append('document', docFile)
    const res = await apiFetch('/api/v1/member/verification', { method: 'POST', body: form })
    const body = await res.json()
    if (!res.ok) {
      setError(body.error ?? 'Verification submit failed')
      return
    }
    setMessage('Verification submitted for review')
    load()
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    const res = await apiFetch('/api/v1/member/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      }),
    })
    const body = await res.json()
    if (!res.ok) {
      setError(body.error ?? 'Password change failed')
      return
    }
    setMessage('Password updated')
    setPasswords({ current: '', next: '' })
  }

  const vStatus = data?.verification?.status ?? 'none'
  const avatarSrc = data?.profile?.avatarUrl ?? null

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Account settings"
        description="Manage your profile, identity verification, and security."
      />

      <TabList tabs={tabs} active={tab} onChange={setTab} />

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="error">{error}</Alert>}

      {tab === 'profile' && (
        <form onSubmit={saveProfile}>
          <FormCard title="Profile" description="This information appears on your member account.">
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-edge bg-paper shadow-soft">
                {avatarSrc ? (
                  <Image src={avatarSrc} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-muted">
                    <Camera className="h-8 w-8" />
                  </div>
                )}
              </div>
              <input
                ref={avatarRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) uploadAvatar(f)
                }}
              />
              <Button type="button" variant="secondary" size="sm" onClick={() => avatarRef.current?.click()}>
                Change photo
              </Button>
            </div>

            {(
              [
                ['fullName', 'Full name'],
                ['phone', 'Phone'],
                ['position', 'Position / title'],
                ['organization', 'Organisation'],
                ['partyAffiliation', 'Party affiliation'],
                ['country', 'Country'],
              ] as const
            ).map(([key, label]) => (
              <FormField key={key} id={`profile-${key}`} label={label}>
                <input
                  id={`profile-${key}`}
                  value={profile[key]}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  className="input-field"
                />
              </FormField>
            ))}
            <FormField id="profile-bio" label="Bio">
              <textarea
                id="profile-bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="input-field"
              />
            </FormField>
            <Button type="submit" variant="primary">
              Save profile
            </Button>
          </FormCard>
        </form>
      )}

      {tab === 'verification' && (
        <div className="max-w-xl space-y-6">
          {vStatus === 'approved' && (
            <Alert variant="success" title="Verified">
              <Shield className="mb-1 inline h-4 w-4" /> Your identity is verified. Thank you.
            </Alert>
          )}
          {vStatus === 'pending' && (
            <Alert variant="warning" title="Pending review">
              The secretariat will review your submission.
              {data?.verification?.adminNotes && (
                <span className="mt-2 block">Note: {data.verification.adminNotes}</span>
              )}
            </Alert>
          )}
          {vStatus === 'rejected' && (
            <Alert variant="error" title="Not approved">
              Please submit updated documents below.
              {data?.verification?.adminNotes && (
                <span className="mt-2 block">{data.verification.adminNotes}</span>
              )}
            </Alert>
          )}
          {(vStatus === 'none' || vStatus === 'rejected') && (
            <form onSubmit={submitVerification}>
              <FormCard
                title="Submit verification"
                description="Upload a valid national ID. PDF or image, max 10MB."
              >
                <FormField id="nationalId" label="National ID number" required>
                  <input
                    id="nationalId"
                    required
                    value={verification.nationalId}
                    onChange={(e) => setVerification({ nationalId: e.target.value })}
                    className="input-field"
                  />
                </FormField>
                <FormField id="idDocument" label="ID document" required hint="PDF or image, max 10MB">
                  <input
                    id="idDocument"
                    type="file"
                    required={vStatus === 'none'}
                    accept="image/*,application/pdf"
                    onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
                    className="input-field py-2.5 file:mr-4 file:rounded-lg file:border-0 file:bg-accent-blue/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-accent-blue"
                  />
                </FormField>
                <Button type="submit" variant="primary">
                  Submit for verification
                </Button>
              </FormCard>
            </form>
          )}
          {vStatus === 'pending' && <Badge variant="warning">Under review</Badge>}
        </div>
      )}

      {tab === 'security' && (
        <form onSubmit={changePassword} className="max-w-xl">
          <FormCard title="Password" description="Use at least 8 characters.">
            <FormField id="current-password" label="Current password" required>
              <PasswordInput
                id="current-password"
                required
                autoComplete="current-password"
                value={passwords.current}
                onChange={(v) => setPasswords({ ...passwords, current: v })}
              />
            </FormField>
            <FormField id="new-password" label="New password" required hint="Minimum 8 characters">
              <PasswordInput
                id="new-password"
                required
                minLength={8}
                autoComplete="new-password"
                value={passwords.next}
                onChange={(v) => setPasswords({ ...passwords, next: v })}
              />
            </FormField>
            <Button type="submit" variant="primary">
              Update password
            </Button>
          </FormCard>
        </form>
      )}
    </div>
  )
}

export default function MemberSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-edge/50" />
          <div className="h-64 animate-pulse rounded-2xl bg-edge/40" />
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  )
}
