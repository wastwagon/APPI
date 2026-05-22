'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import {
  downloadLeadsExport,
  fetchAdminLeads,
  updateLeadStatus,
  type LeadItem,
  type LeadStatus,
} from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { DataPanel, DataTable } from '@/components/ui/data-panel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'

const STATUS_OPTIONS: { value: '' | LeadStatus; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'archived', label: 'Archived' },
]

function statusBadge(status: LeadStatus) {
  const styles: Record<LeadStatus, string> = {
    new: 'bg-accent-blue/10 text-accent-blue',
    read: 'bg-edge text-ink-muted',
    archived: 'bg-paper text-ink-muted',
  }
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize',
        styles[status]
      )}
    >
      {status}
    </span>
  )
}

function payloadPreview(payload: Record<string, unknown>): string {
  const pick = ['email', 'name', 'fullName', 'subject', 'message', 'organisation']
  for (const key of pick) {
    const v = payload[key]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return JSON.stringify(payload).slice(0, 80)
}

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadItem[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [formType, setFormType] = useState('')
  const [status, setStatus] = useState<'' | LeadStatus>('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const formTypes = useMemo(() => {
    const set = new Set(items.map((i) => i.formType))
    return [...set].sort()
  }, [items])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAdminLeads({
        formType: formType || undefined,
        status: status || undefined,
        limit: 200,
      })
      setItems(data.items)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [formType, status])

  useEffect(() => {
    load()
  }, [load])

  async function setLeadStatus(id: string, next: LeadStatus) {
    setUpdatingId(id)
    try {
      const { item } = await updateLeadStatus(id, next)
      setItems((prev) => prev.map((row) => (row.id === id ? item : row)))
    } catch (e) {
      console.error(e)
    } finally {
      setUpdatingId(null)
    }
  }

  async function exportCsv() {
    const blob = await downloadLeadsExport({
      formType: formType || undefined,
      status: status || undefined,
    }).catch((e) => {
      console.error(e)
      return null
    })
    if (!blob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'leads-export.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Leads & submissions"
        description="Filter, mark read, archive, and export form submissions from the public site."
      />

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="lead-form-type" className="block text-xs font-medium text-ink-muted">
            Form type
          </label>
          <select
            id="lead-form-type"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="input-field mt-1 min-w-[10rem] text-sm"
          >
            <option value="">All types</option>
            {formTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lead-status" className="block text-xs font-medium text-ink-muted">
            Status
          </label>
          <select
            id="lead-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as '' | LeadStatus)}
            className="input-field mt-1 min-w-[10rem] text-sm"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={() => load()}>
          Refresh
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={exportCsv}>
          <Download className="mr-1.5 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {loading ? (
        <div className="h-48 animate-pulse rounded-2xl bg-edge/40" />
      ) : items.length === 0 ? (
        <DataPanel
          empty={
            <>
              <p className="font-medium text-ink">No submissions yet</p>
              <p className="mt-1">
                Form inquiries will appear here when visitors submit contact or engagement forms.
              </p>
            </>
          }
        />
      ) : (
        <DataPanel>
          <DataTable>
            <thead>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>Date</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <Fragment key={item.id}>
                  <tr>
                    <td>{statusBadge(item.status)}</td>
                    <td className="font-medium text-ink">{item.formType}</td>
                    <td className="whitespace-nowrap text-ink-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="max-w-xs truncate text-ink-muted">
                      {payloadPreview(item.payload)}
                    </td>
                    <td className="space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="text-xs font-semibold text-accent-blue hover:underline"
                        onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                      >
                        {expanded === item.id ? 'Hide' : 'Details'}
                      </button>
                      {item.status !== 'read' && (
                        <button
                          type="button"
                          disabled={updatingId === item.id}
                          className="text-xs font-semibold text-ink-muted hover:text-ink disabled:opacity-50"
                          onClick={() => setLeadStatus(item.id, 'read')}
                        >
                          Mark read
                        </button>
                      )}
                      {item.status !== 'archived' && (
                        <button
                          type="button"
                          disabled={updatingId === item.id}
                          className="text-xs font-semibold text-ink-muted hover:text-ink disabled:opacity-50"
                          onClick={() => setLeadStatus(item.id, 'archived')}
                        >
                          Archive
                        </button>
                      )}
                      {item.status !== 'new' && (
                        <button
                          type="button"
                          disabled={updatingId === item.id}
                          className="text-xs font-semibold text-ink-muted hover:text-ink disabled:opacity-50"
                          onClick={() => setLeadStatus(item.id, 'new')}
                        >
                          Reopen
                        </button>
                      )}
                    </td>
                  </tr>
                  {expanded === item.id && (
                    <tr>
                      <td colSpan={5} className="bg-paper/50">
                        <pre className="overflow-x-auto rounded-lg border border-edge/60 bg-paper-white p-4 text-xs text-ink">
                          {JSON.stringify(item.payload, null, 2)}
                        </pre>
                        {item.sourceIp && (
                          <p className="mt-2 text-xs text-ink-muted">IP: {item.sourceIp}</p>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </DataTable>
        </DataPanel>
      )}
    </div>
  )
}
