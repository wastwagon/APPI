import { getAccessToken, getRefreshToken, clearTokens } from './auth-client'

const API_BASE = ''

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken()
  if (!refresh) return null
  const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refresh }),
  })
  if (!res.ok) return null
  const data = await res.json()
  localStorage.setItem('appi_access_token', data.accessToken)
  return data.accessToken as string
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  let token = getAccessToken()
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let res = await fetch(`${API_BASE}${path}`, { ...init, headers })

  if (res.status === 401) {
    token = await refreshAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      res = await fetch(`${API_BASE}${path}`, { ...init, headers })
    }
  }

  if (res.status === 401) {
    clearTokens()
    if (typeof window !== 'undefined') {
      const loginPath = window.location.pathname.startsWith('/admin')
        ? '/admin/login'
        : '/member/login'
      window.location.href = loginPath
    }
  }

  return res
}

export type MemberProfile = {
  id: string
  email: string
  fullName: string | null
  role: string
  profile: {
    avatarUrl: string | null
    partyAffiliation: string | null
    country: string | null
    bio: string | null
    phone: string | null
    position: string | null
    organization: string | null
    verificationStatus: string
  } | null
  verification: {
    id: string
    status: string
    nationalId: string
    submittedAt: string
    adminNotes: string | null
  } | null
  summitRegistration: {
    id: string
    status: string
    summitYear: string
    organisation: string
    country: string
    delegationRole: string | null
    dietaryNotes: string | null
  } | null
  unreadNotifications?: number
}

export async function fetchMemberProfile(): Promise<MemberProfile> {
  const res = await apiFetch('/api/v1/member/profile')
  if (!res.ok) throw new Error('Failed to load profile')
  return res.json()
}

export type AppNotification = {
  id: string
  kind: string
  title: string
  body: string
  href: string | null
  readAt: string | null
  createdAt: string
}

export async function fetchNotifications(): Promise<{ unread: number; items: AppNotification[] }> {
  const res = await apiFetch('/api/v1/member/notifications')
  if (!res.ok) throw new Error('Failed to load notifications')
  return res.json()
}

export async function markNotificationsRead(opts: { all?: boolean; ids?: string[] }) {
  const res = await apiFetch('/api/v1/member/notifications/read', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts),
  })
  if (!res.ok) throw new Error('Failed to update notifications')
}
