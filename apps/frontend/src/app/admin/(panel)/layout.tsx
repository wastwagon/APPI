import { AdminShell } from '@/components/admin/admin-shell'
import { RequireAdmin } from '@/components/admin/require-admin'

/** Admin panel: English-only UI (outside next-intl `[locale]` routes). */
export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdmin>
      <AdminShell>{children}</AdminShell>
    </RequireAdmin>
  )
}
