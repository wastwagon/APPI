import { MemberShell } from '@/components/member/member-shell'
import { RequireAuth } from '@/components/member/require-auth'

/** Member portal: English-only UI (outside next-intl `[locale]` routes). */
export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <MemberShell>{children}</MemberShell>
    </RequireAuth>
  )
}
