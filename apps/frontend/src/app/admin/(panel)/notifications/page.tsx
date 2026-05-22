'use client'

import { useState } from 'react'
import { broadcastNotification } from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [href, setHref] = useState('/member/dashboard')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setMessage(null)
    setError(null)
    try {
      const result = await broadcastNotification({ title, body, href: href || undefined })
      setMessage(`Sent to ${(result as { sent: number }).sent} members.`)
      setTitle('')
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-8 max-w-xl">
      <DashboardHeader
        title="Notifications"
        description="Broadcast in-app announcements to all member accounts (excludes admins)."
      />

      <form onSubmit={handleSend}>
        <FormCard title="New announcement" description="Members see this in their notification inbox.">
          <FormField id="broadcast-title" label="Title" required>
            <input
              id="broadcast-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
          </FormField>
          <FormField id="broadcast-body" label="Message" required>
            <textarea
              id="broadcast-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={4}
              className="input-field"
            />
          </FormField>
          <FormField id="broadcast-href" label="Link (optional)" hint="e.g. /member/summit">
            <input
              id="broadcast-href"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              placeholder="/member/dashboard"
              className="input-field"
            />
          </FormField>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="error">{error}</Alert>}
          <Button type="submit" disabled={sending}>
            <Send className="mr-2 h-4 w-4" />
            {sending ? 'Sending…' : 'Broadcast to all members'}
          </Button>
        </FormCard>
      </form>
    </div>
  )
}
