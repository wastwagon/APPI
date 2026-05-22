import { PageHero } from '@/components/layout/page-hero'
import { ContentProse } from '@/components/layout/content-prose'
import { siteConfig } from '@/lib/site'
import type { LegalDocument } from '@/data/legacy-legal-content'

type Props = {
  document: LegalDocument
}

export function LegalDocumentPage({ document }: Props) {
  return (
    <>
      <PageHero
        title={document.title}
        description={`Last updated: ${document.lastUpdated}`}
      />
      <ContentProse>
        <div className="space-y-8">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-semibold text-ink">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
              {section.list && section.list.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {document.contactNote ? (
            <section className="rounded-xl border border-edge bg-paper-muted p-5">
              <h2 className="font-serif text-lg font-semibold text-ink">Contact us</h2>
              <p className="mt-2 text-sm text-ink-muted">{document.contactNote}</p>
              <p className="mt-4 text-sm text-ink-muted">
                <strong className="text-ink">Email:</strong>{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-accent-blue hover:underline">
                  {siteConfig.email}
                </a>
                <br />
                <strong className="text-ink">Phone:</strong>{' '}
                <a href={`tel:${siteConfig.phoneTel}`} className="text-accent-blue hover:underline">
                  {siteConfig.phoneDisplay}
                </a>
                <br />
                <strong className="text-ink">Address:</strong> {siteConfig.address}
              </p>
            </section>
          ) : null}
        </div>
      </ContentProse>
    </>
  )
}
