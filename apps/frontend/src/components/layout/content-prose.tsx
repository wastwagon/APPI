import { SiteContainer } from './site-container'

type ContentProseProps = {
  children: React.ReactNode
}

export function ContentProse({ children }: ContentProseProps) {
  return (
    <SiteContainer className="max-w-3xl py-12 sm:py-16">
      <div className="prose-appi space-y-6 text-base leading-relaxed text-ink-muted [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:tracking-tight [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:font-medium [&_a]:text-accent-blue [&_a]:no-underline hover:[&_a]:underline">
        {children}
      </div>
    </SiteContainer>
  )
}
