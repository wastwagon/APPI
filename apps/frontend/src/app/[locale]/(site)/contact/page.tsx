import { Mail, MessageSquare, Share2 } from 'lucide-react'
import { HubWithBrief } from '@/components/layout/hub-with-brief'
import { ContactSubnav } from '@/components/layout/contact-subnav'
import { ContactForm } from '@/components/forms/contact-form'

const items = [
  { messageKey: 'secretariat', href: '/contact/secretariat', icon: Mail },
  { messageKey: 'mediation', href: '/contact/mediation', icon: MessageSquare },
  { messageKey: 'socialChannels', href: '/contact/social', icon: Share2 },
]

export default function ContactPage() {
  return (
    <>
      <HubWithBrief
        briefNamespace="content.contact.overview"
        eyebrowKey="contact"
        imageKey="appiLaunch"
        hubNamespace="pages.contact"
        hubTitleKey="exploreTitle"
        hubDescriptionKey="exploreDesc"
        items={items}
        heroChildren={<ContactSubnav />}
      />
      <div id="inquiry">
        <ContactForm />
      </div>
    </>
  )
}
