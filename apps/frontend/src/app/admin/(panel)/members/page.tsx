'use client'

import { useEffect, useState } from 'react'
import { fetchAdminMembers, updateMemberRole, type MemberItem } from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { DataPanel } from '@/components/ui/data-panel'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'

const roles = ['public', 'fellow', 'party_rep', 'observer', 'admin']

export default function AdminMembersPage() {
  const [items, setItems] = useState<MemberItem[]>([])
  const [search, setSearch] = useState('')
  const [roleEdits, setRoleEdits] = useState<Record<string, string>>({})

  function load(q?: string) {
    fetchAdminMembers(q)
      .then((d) => {
        setItems(d.items)
        const edits: Record<string, string> = {}
        d.items.forEach((m) => {
          edits[m.id] = m.role
        })
        setRoleEdits(edits)
      })
      .catch(console.error)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-8">
      <DashboardHeader title="Members" description="Registered users, roles, and verification status." />

      <form
        className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault()
          load(search)
        }}
      >
        <FormField id="member-search" label="Search" className="min-w-0 flex-1">
          <input
            id="member-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Email or name"
            className="input-field"
          />
        </FormField>
        <Button type="submit" variant="secondary" size="sm" className="shrink-0">
          Search
        </Button>
      </form>

      {items.length === 0 ? (
        <DataPanel empty={<p>No members found.</p>} />
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li
              key={m.id}
              className="flex flex-col gap-4 rounded-2xl border border-edge/80 bg-paper-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-ink">{m.fullName ?? '—'}</p>
                <p className="text-sm text-ink-muted">{m.email}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  Joined {new Date(m.createdAt).toLocaleDateString()}
                  {m.profile?.verificationStatus &&
                    ` · Verification: ${String(m.profile.verificationStatus).toLowerCase()}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={roleEdits[m.id] ?? m.role}
                  onChange={(e) => setRoleEdits({ ...roleEdits, [m.id]: e.target.value })}
                  className="input-field w-auto min-w-[10rem] py-2.5 text-sm"
                  aria-label={`Role for ${m.email}`}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={() => updateMemberRole(m.id, roleEdits[m.id]).then(() => load(search))}
                >
                  Save
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
