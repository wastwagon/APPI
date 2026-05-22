import { cn } from '@/lib/utils'

export function DataPanel({
  children,
  className,
  empty,
}: {
  children?: React.ReactNode
  className?: string
  empty?: React.ReactNode
}) {
  if (empty) {
    return <div className="empty-state">{empty}</div>
  }
  return <div className={cn('data-panel', className)}>{children}</div>
}

export function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="data-table">{children}</table>
    </div>
  )
}
