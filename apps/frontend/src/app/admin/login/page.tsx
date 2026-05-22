'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { AuthLayout } from '@/components/ui/auth-layout'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { setTokens } from '@/lib/auth-client'
import { apiFetch } from '@/lib/member-api'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await parseApiJson<{
        accessToken?: string
        refreshToken?: string
        user?: { role?: string }
        error?: string
        message?: string
      }>(res)
      if (!res.ok) throw new Error(apiErrorMessage(data, 'Login failed'))
      if (data.user?.role !== 'admin') {
        throw new Error('This account does not have admin access')
      }
      setTokens(data.accessToken!, data.refreshToken!)
      const stats = await apiFetch('/api/v1/admin/stats')
      if (!stats.ok) throw new Error('Admin access check failed')
      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      variant="admin"
      eyebrow="Secretariat"
      title="Admin sign in"
      description="Manage members, content, media, and site settings."
      footer={
        <Link href="/" className="text-accent-blue hover:underline">
          Back to website
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField id="email" label="Email" required>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </FormField>
        <FormField id="password" label="Password" required>
          <PasswordInput
            id="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
          />
        </FormField>
        {error && <Alert variant="error">{error}</Alert>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
