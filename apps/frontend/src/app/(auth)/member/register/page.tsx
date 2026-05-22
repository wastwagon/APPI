'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { setTokens } from '@/lib/auth-client'
import { PasswordInput } from '@/components/ui/password-input'
import { AuthLayout } from '@/components/ui/auth-layout'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { apiErrorMessage, parseApiJson } from '@/lib/parse-api-response'

export default function MemberRegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const data = new FormData(e.currentTarget)
    const body = {
      email: data.get('email'),
      password,
      fullName: data.get('fullName'),
    }
    try {
      const reg = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const regData = await parseApiJson<{ error?: string; message?: string }>(reg)
      if (!reg.ok) throw new Error(apiErrorMessage(regData, 'Registration failed'))

      const login = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: body.email, password: body.password }),
      })
      const loginData = await parseApiJson<{
        accessToken?: string
        refreshToken?: string
        error?: string
        message?: string
      }>(login)
      if (!login.ok) throw new Error(apiErrorMessage(loginData, 'Login after register failed'))

      setTokens(loginData.accessToken!, loginData.refreshToken!)
      window.location.href = '/member/dashboard'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      variant="member"
      eyebrow="Members"
      title="Create account"
      description="Join the APPI member portal for summit registration and programme access."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/member/login" className="font-semibold text-accent-blue hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField id="fullName" label="Full name" required>
          <input id="fullName" name="fullName" required className="input-field" />
        </FormField>
        <FormField id="email" label="Email" required>
          <input id="email" name="email" type="email" required autoComplete="email" className="input-field" />
        </FormField>
        <FormField id="password" label="Password" required hint="Minimum 8 characters">
          <PasswordInput
            id="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
          />
        </FormField>
        {error && <Alert variant="error">{error}</Alert>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </Button>
      </form>
    </AuthLayout>
  )
}
