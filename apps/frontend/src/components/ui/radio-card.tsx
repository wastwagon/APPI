import { cn } from '@/lib/utils'

export function RadioCard({
  name,
  checked,
  onChange,
  title,
  description,
  icon,
  accent = 'blue',
}: {
  name: string
  checked: boolean
  onChange: () => void
  title: string
  description: string
  icon?: React.ReactNode
  accent?: 'blue' | 'warm'
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors',
        checked
          ? accent === 'warm'
            ? 'border-accent-warm/50 bg-accent-warm/5 ring-1 ring-accent-warm/20'
            : 'border-accent-blue/40 bg-accent-blue/5 ring-1 ring-accent-blue/15'
          : 'border-edge hover:border-edge-strong hover:bg-paper/50'
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 border-edge text-accent-blue focus:ring-accent-blue"
      />
      {icon && <span className="shrink-0 text-ink-muted">{icon}</span>}
      <div>
        <span className="font-medium text-ink">{title}</span>
        <p className="mt-0.5 text-sm text-ink-muted">{description}</p>
      </div>
    </label>
  )
}
