'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchMemberProfile, type MemberProfile } from '@/lib/member-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Shield, Calendar, Settings, Bell, ArrowRight } from 'lucide-react'

function verificationVariant(status: string): 'success' | 'warning' | 'error' | 'neutral' {
  if (status === 'approved') return 'success'
  if (status === 'pending') return 'warning'
  if (status === 'rejected') return 'error'
  return 'neutral'
}

export default function MemberDashboardPage() {
  const [data, setData] = useState<MemberProfile | null>(null)

  useEffect(() => {
    fetchMemberProfile().then(setData).catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-edge/60" />
        <div className="h-32 animate-pulse rounded-2xl bg-edge/40" />
      </div>
    )
  }

  const vStatus =
    data.verification?.status ?? data.profile?.verificationStatus?.toLowerCase() ?? 'none'
  const unread = data.unreadNotifications ?? 0

  return (
    <div className="space-y-8">
      <section className="member-card-highlight">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">Member portal</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
          Welcome{data.fullName ? `, ${data.fullName}` : ''}
        </h2>
        <p className="mt-2 max-w-md text-sm text-white/80">{data.email}</p>
      </section>

      {unread > 0 && (
        <Link href="/member/notifications" className="block">
          <Alert variant="info" title={`${unread} new notification${unread === 1 ? '' : 's'}`}>
            <span className="inline-flex items-center gap-1 font-semibold">
              Review updates <ArrowRight className="h-4 w-4" />
            </span>
          </Alert>
        </Link>
      )}

      <DashboardHeader
        title="Your programmes"
        description="Manage verification, summit delegation, and account settings."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <article className="member-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
              <Shield className="h-5 w-5" />
            </div>
            <Badge variant={verificationVariant(vStatus)}>
              {vStatus === 'none' ? 'not submitted' : vStatus.replace(/_/g, ' ')}
            </Badge>
          </div>
          <h3 className="mt-4 font-semibold text-ink">Identity verification</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Verified members access full programme resources and summit delegation support.
          </p>
          {vStatus !== 'approved' && (
            <Button asChild variant="secondary" size="sm" className="mt-5">
              <Link href="/member/settings?tab=verification">
                {vStatus === 'pending' ? 'View status' : 'Submit verification'}
              </Link>
            </Button>
          )}
        </article>

        <article className="member-card">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-teal/10 text-accent-teal">
            <Calendar className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-semibold text-ink">Summit registration</h3>
          {data.summitRegistration ? (
            <>
              <p className="mt-2 text-sm text-ink-muted">
                {data.summitRegistration.organisation} · {data.summitRegistration.country}
              </p>
              <div className="mt-3">
                <Badge variant="info">{data.summitRegistration.status}</Badge>
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-5">
                <Link href="/member/summit">Update registration</Link>
              </Button>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Register your delegation for the African Political Parties Summit.
              </p>
              <Button asChild variant="primary" size="sm" className="mt-5">
                <Link href="/member/summit">Register for summit</Link>
              </Button>
            </>
          )}
        </article>

        <article className="member-card sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-ink-muted">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-ink">Notifications</h3>
                <p className="text-sm text-ink-muted">Summit and verification updates</p>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/member/notifications">Open inbox</Link>
            </Button>
          </div>
        </article>
      </div>

      <Button asChild variant="ghost">
        <Link href="/member/settings">
          <Settings className="mr-2 h-4 w-4" /> Account settings
        </Link>
      </Button>
    </div>
  )
}
