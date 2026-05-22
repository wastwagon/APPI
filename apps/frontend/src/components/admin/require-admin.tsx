'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken, clearTokens } from '@/lib/auth-client'
import { apiFetch } from '@/lib/member-api'

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      router.replace('/admin/login')
      return
    }
    apiFetch('/api/v1/admin/stats')
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          clearTokens()
          router.replace('/admin/login')
          return
        }
        if (!res.ok) throw new Error('stats failed')
        setReady(true)
      })
      .catch(() => {
        router.replace('/admin/login')
      })
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-ink-muted">
        Verifying admin access…
      </div>
    )
  }

  return <>{children}</>
}
