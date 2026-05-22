import { ContactDetail } from '@/components/content/contact-detail'
import { ContactForm } from '@/components/forms/contact-form'

export default function ContactMediationPage() {
  return (
    <>
      <ContactDetail slug="mediation" />
      <div id="inquiry">
        <ContactForm />
      </div>
    </>
  )
}
