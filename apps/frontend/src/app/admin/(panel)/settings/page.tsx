'use client'

import { useEffect, useState } from 'react'
import {
  fetchAdminSettings,
  updateAdminSettings,
  runAdminMigrate,
  runAdminSeed,
  type SiteSettings,
} from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { RadioCard } from '@/components/ui/radio-card'
import { Button } from '@/components/ui/button'
import { Database, Sprout, Save, Globe, Construction } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState<'live' | 'under_construction'>('live')
  const [saving, setSaving] = useState(false)
  const [opsLog, setOpsLog] = useState<string | null>(null)
  const [opsRunning, setOpsRunning] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchAdminSettings()
      .then((s) => {
        setSettings(s)
        setMode(s.siteMode)
        setTitle(s.constructionTitle ?? '')
        setMessage(s.constructionMessage ?? '')
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  async function saveSite(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const updated = await updateAdminSettings({
        siteMode: mode,
        constructionTitle: title,
        constructionMessage: message,
      })
      setSettings(updated)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function runOp(kind: 'migrate' | 'seed') {
    setOpsRunning(kind)
    setOpsLog(null)
    setError(null)
    try {
      const result = kind === 'migrate' ? await runAdminMigrate() : await runAdminSeed()
      setOpsLog(result.output)
      if (!result.ok) setError(`${kind} failed — see log below`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed')
    } finally {
      setOpsRunning(null)
    }
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <DashboardHeader
        title="Settings"
        description="Site visibility, construction page copy, and deployment tools."
      />

      {error && <Alert variant="error">{error}</Alert>}
      {saved && <Alert variant="success">Site settings saved.</Alert>}

      <form onSubmit={saveSite}>
        <FormCard
          title="Site mode"
          description="Control what visitors see on the public marketing site."
          footer={
            settings ? (
              <p className="text-xs text-ink-muted">
                Last updated {new Date(settings.updatedAt).toLocaleString()}
              </p>
            ) : undefined
          }
        >
          <div className="space-y-3">
            <RadioCard
              name="siteMode"
              checked={mode === 'live'}
              onChange={() => setMode('live')}
              title="Live"
              description="Public site is fully accessible."
              icon={<Globe className="h-5 w-5 text-accent-blue" />}
            />
            <RadioCard
              name="siteMode"
              checked={mode === 'under_construction'}
              onChange={() => setMode('under_construction')}
              title="Under construction"
              description="Visitors see the construction page; admin and member areas stay available."
              icon={<Construction className="h-5 w-5 text-accent-warm" />}
              accent="warm"
            />
          </div>

          <FormField id="construction-title" label="Construction headline">
            <input
              id="construction-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
          </FormField>
          <FormField id="construction-message" label="Construction message">
            <textarea
              id="construction-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="input-field"
            />
          </FormField>

          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving…' : 'Save site settings'}
          </Button>
        </FormCard>
      </form>

      <FormCard
        title="Database operations"
        description="If deployment migrations or seed failed in Coolify, run them manually here. Requires database connectivity from the API."
      >
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary" disabled={!!opsRunning} onClick={() => runOp('migrate')}>
            <Database className="mr-2 h-4 w-4" />
            {opsRunning === 'migrate' ? 'Running…' : 'Run migrations'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!!opsRunning}
            onClick={() => {
              if (!confirm('Run database seed? This upserts default site settings.')) return
              runOp('seed')
            }}
          >
            <Sprout className="mr-2 h-4 w-4" />
            {opsRunning === 'seed' ? 'Running…' : 'Run seed'}
          </Button>
        </div>
        {opsLog && (
          <pre className="mt-4 max-h-64 overflow-auto rounded-xl border border-edge/60 bg-paper p-4 text-xs leading-relaxed text-ink-muted whitespace-pre-wrap">
            {opsLog}
          </pre>
        )}
      </FormCard>
    </div>
  )
}
