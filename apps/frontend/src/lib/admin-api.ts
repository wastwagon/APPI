import { apiFetch } from './member-api'

export type AdminStats = {
  members: number
  pendingVerifications: number
  leads: number
  summitRegistrations: number
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await apiFetch('/api/v1/admin/stats')
  if (!res.ok) throw new Error('Failed to load stats')
  return res.json()
}

export type LeadStatus = 'new' | 'read' | 'archived'

export type LeadItem = {
  id: string
  formType: string
  payload: Record<string, unknown>
  status: LeadStatus
  readAt: string | null
  sourceIp: string | null
  createdAt: string
}

export type FetchAdminLeadsParams = {
  formType?: string
  status?: LeadStatus
  limit?: number
}

export async function fetchAdminLeads(params?: FetchAdminLeadsParams) {
  const q = new URLSearchParams()
  if (params?.formType) q.set('formType', params.formType)
  if (params?.status) q.set('status', params.status)
  if (params?.limit) q.set('limit', String(params.limit))
  const suffix = q.toString() ? `?${q}` : ''
  const res = await apiFetch(`/api/v1/admin/leads${suffix}`)
  if (!res.ok) throw new Error('Failed to load leads')
  return res.json() as Promise<{ items: LeadItem[] }>
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const res = await apiFetch(`/api/v1/admin/leads/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Update failed')
  }
  return res.json() as Promise<{ item: LeadItem }>
}

export async function downloadLeadsExport(params?: { formType?: string; status?: LeadStatus }) {
  const q = new URLSearchParams()
  if (params?.formType) q.set('formType', params.formType)
  if (params?.status) q.set('status', params.status)
  const suffix = q.toString() ? `?${q}` : ''
  const res = await apiFetch(`/api/v1/admin/leads/export${suffix}`)
  if (!res.ok) throw new Error('Export failed')
  return res.blob()
}

export async function fetchAdminVerifications() {
  const res = await apiFetch('/api/v1/admin/verifications')
  if (!res.ok) throw new Error('Failed to load verifications')
  return res.json() as Promise<{ items: VerificationItem[] }>
}

export type VerificationItem = {
  id: string
  userId: string
  email: string
  fullName: string | null
  nationalId: string
  documentPath: string | null
  submittedAt: string
}

export async function reviewVerification(
  id: string,
  action: 'approve' | 'reject',
  notes?: string
) {
  const res = await apiFetch(`/api/v1/admin/verifications/${id}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, notes }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Review failed')
  }
  return res.json()
}

export async function fetchAdminMembers(search?: string) {
  const q = search ? `?search=${encodeURIComponent(search)}` : ''
  const res = await apiFetch(`/api/v1/admin/members${q}`)
  if (!res.ok) throw new Error('Failed to load members')
  return res.json() as Promise<{ items: MemberItem[] }>
}

export type MemberItem = {
  id: string
  email: string
  fullName: string | null
  role: string
  createdAt: string
  profile: {
    verificationStatus: string
    country: string | null
    organization: string | null
  } | null
}

export async function updateMemberRole(id: string, role: string) {
  const res = await apiFetch(`/api/v1/admin/members/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  })
  if (!res.ok) throw new Error('Failed to update role')
  return res.json()
}

export async function fetchSummitRegistrations() {
  const res = await apiFetch('/api/v1/admin/summit-registrations')
  if (!res.ok) throw new Error('Failed to load registrations')
  return res.json() as Promise<{ items: SummitRegItem[] }>
}

export type SiteSettings = {
  siteMode: 'live' | 'under_construction'
  constructionTitle: string | null
  constructionMessage: string | null
  updatedAt: string
}

export async function fetchAdminSettings(): Promise<SiteSettings> {
  const res = await apiFetch('/api/v1/admin/settings')
  if (!res.ok) throw new Error('Failed to load settings')
  return res.json()
}

export async function updateAdminSettings(data: Partial<SiteSettings>) {
  const res = await apiFetch('/api/v1/admin/settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to save settings')
  return res.json() as Promise<SiteSettings>
}

export async function runAdminMigrate(): Promise<{ ok: boolean; output: string }> {
  const res = await apiFetch('/api/v1/admin/ops/migrate', { method: 'POST' })
  return res.json()
}

export async function runAdminSeed(): Promise<{ ok: boolean; output: string }> {
  const res = await apiFetch('/api/v1/admin/ops/seed', { method: 'POST' })
  return res.json()
}

export type MediaLibraryItem = {
  id: string
  type: 'image' | 'document' | 'video'
  title: string | null
  altText: string | null
  caption: string | null
  fileName: string | null
  url: string
  mimeType: string | null
  fileSize: number | null
  folder: string
  youtubeId: string | null
  createdAt: string
}

export async function fetchMediaLibrary(params?: {
  type?: string
  search?: string
}): Promise<{ items: MediaLibraryItem[] }> {
  const q = new URLSearchParams()
  if (params?.type) q.set('type', params.type)
  if (params?.search) q.set('search', params.search)
  const suffix = q.toString() ? `?${q}` : ''
  const res = await apiFetch(`/api/v1/media${suffix}`)
  if (!res.ok) throw new Error('Failed to load media')
  return res.json()
}

export async function uploadMediaFile(file: File, meta?: { title?: string; altText?: string; folder?: string }) {
  const form = new FormData()
  form.append('file', file)
  if (meta?.title) form.append('title', meta.title)
  if (meta?.altText) form.append('altText', meta.altText)
  if (meta?.folder) form.append('folder', meta.folder)
  const res = await apiFetch('/api/v1/media', { method: 'POST', body: form })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Upload failed')
  }
  return res.json() as Promise<MediaLibraryItem>
}

export async function addYoutubeMedia(data: { url: string; title?: string; caption?: string }) {
  const res = await apiFetch('/api/v1/media/youtube', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Failed to add video')
  }
  return res.json() as Promise<MediaLibraryItem>
}

export async function deleteMediaItem(id: string) {
  const res = await apiFetch(`/api/v1/media/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Delete failed')
  return res.json()
}

export type CmsPageListItem = {
  id: string
  slug: string
  locale: string
  published: boolean
  updatedAt: string
  fieldCount: number
}

export type CmsPageDetail = {
  id: string
  slug: string
  locale: string
  fields: Record<string, unknown>
  published: boolean
  updatedAt: string
}

export async function fetchCmsPages(locale: string): Promise<CmsPageListItem[]> {
  const res = await apiFetch(`/api/v1/admin/cms/pages?locale=${locale}`)
  if (!res.ok) throw new Error('Failed to load CMS pages')
  const data = await res.json()
  return data.items as CmsPageListItem[]
}

export async function fetchCmsPage(slug: string, locale: string): Promise<CmsPageDetail> {
  const res = await apiFetch(
    `/api/v1/admin/cms/pages/${encodeURIComponent(slug)}?locale=${locale}`
  )
  if (!res.ok) throw new Error('Page not found')
  return res.json() as Promise<CmsPageDetail>
}

export async function saveCmsPage(data: {
  slug: string
  locale: string
  fields: Record<string, unknown>
  published: boolean
}): Promise<CmsPageDetail> {
  const res = await apiFetch('/api/v1/admin/cms/pages', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Save failed')
  }
  return res.json() as Promise<CmsPageDetail>
}

export async function importCmsFromFiles(): Promise<{ imported: number }> {
  const res = await apiFetch('/api/v1/admin/cms/import', { method: 'POST' })
  if (!res.ok) throw new Error('Import failed')
  return res.json() as Promise<{ imported: number }>
}

export async function broadcastNotification(data: {
  title: string
  body: string
  href?: string
  allMembers?: boolean
}) {
  const res = await apiFetch('/api/v1/admin/notifications/broadcast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, kind: 'ANNOUNCEMENT', allMembers: data.allMembers ?? true }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? 'Broadcast failed')
  }
  return res.json()
}


export type SummitRegItem = {
  id: string
  status: string
  summitYear: string
  organisation: string
  country: string
  delegationRole: string | null
  user: { email: string; fullName: string | null }
  createdAt: string
}
