'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { AuthLayout } from '@/components/ui/auth-layout'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { setTokens } from '@/lib/auth-client'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'

export default function MemberLoginPage() {
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
        error?: string
        message?: string
      }>(res)
      if (!res.ok) throw new Error(apiErrorMessage(data, 'Login failed'))
      setTokens(data.accessToken!, data.refreshToken!)
      window.location.href = '/member/dashboard'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      variant="member"
      eyebrow="Members"
      title="Sign in"
      description="Access your APPI member dashboard, summit registration, and notifications."
      footer={
        <>
          No account?{' '}
          <Link href="/member/register" className="font-semibold text-accent-blue hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField id="email" label="Email" required>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
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
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
