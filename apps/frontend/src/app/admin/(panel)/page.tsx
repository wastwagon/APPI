'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchAdminStats, type AdminStats } from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { StatCard } from '@/components/ui/stat-card'
import { Users, Shield, Mail, Calendar, ImageIcon, Settings, FileText } from 'lucide-react'

const stats = [
  { key: 'members' as const, label: 'Members', href: '/admin/members', icon: Users, accent: 'blue' as const },
  { key: 'pendingVerifications' as const, label: 'Pending verifications', href: '/admin/verifications', icon: Shield, accent: 'warm' as const },
  { key: 'leads' as const, label: 'Form submissions', href: '/admin/leads', icon: Mail, accent: 'teal' as const },
  { key: 'summitRegistrations' as const, label: 'Summit registrations', href: '/admin/summit', icon: Calendar, accent: 'gold' as const },
]

const quickLinks = [
  { label: 'Media library', href: '/admin/media', icon: ImageIcon, desc: 'Images, PDFs, and YouTube assets' },
  { label: 'Content (CMS)', href: '/admin/content', icon: FileText, desc: 'Pages, hubs, and programme copy' },
  { label: 'Site settings', href: '/admin/settings', icon: Settings, desc: 'Live mode, migrations, and seed' },
]

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminStats | null>(null)

  useEffect(() => {
    fetchAdminStats().then(setData).catch(console.error)
  }, [])

  return (
    <div className="space-y-10">
      <DashboardHeader
        eyebrow="Secretariat"
        title="Dashboard"
        description="Overview of members, verifications, inquiries, and summit activity."
      />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Quick access</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {quickLinks.map((q) => (
            <Link key={q.href} href={q.href} className="dash-stat-card block">
              <q.icon className="h-6 w-6 text-accent-warm" />
              <p className="mt-4 font-semibold text-ink">{q.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{q.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {stats.map((s) => (
            <StatCard
              key={s.key}
              label={s.label}
              value={data ? data[s.key] : '—'}
              href={s.href}
              icon={s.icon}
              accent={s.accent}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
