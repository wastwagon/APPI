import { StatusPanel } from '@/components/status-panel'

export default function DevStatusPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 sm:px-6">
      <header>
        <h1 className="font-serif text-2xl font-semibold text-ink">Development status</h1>
        <p className="mt-2 text-sm text-ink-muted">Stack health for local debugging.</p>
      </header>
      <StatusPanel />
    </div>
  )
}
