import { SiteContainer } from './site-container'
import { cn } from '@/lib/utils'

type SectionBlockProps = {
  children: React.ReactNode
  className?: string
  tone?: 'default' | 'muted' | 'white'
  id?: string
}

export function SectionBlock({ children, className, tone = 'default', id }: SectionBlockProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20 lg:py-24',
        tone === 'muted' && 'bg-paper',
        tone === 'white' && 'bg-paper-white',
        className
      )}
    >
      <SiteContainer>{children}</SiteContainer>
    </section>
  )
}
