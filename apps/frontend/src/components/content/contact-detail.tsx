import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { ContactSubnav } from '@/components/layout/contact-subnav'
import { contactImages } from '@/lib/content-images'

export type ContactSlug = 'secretariat' | 'mediation' | 'social'

export async function ContactDetail({ slug }: { slug: ContactSlug }) {
  return (
    <ProgrammeBrief
      namespace={`content.contact.${slug}`}
      eyebrowKey="contact"
      imageKey={contactImages[slug]}
      heroChildren={<ContactSubnav />}
    />
  )
}
