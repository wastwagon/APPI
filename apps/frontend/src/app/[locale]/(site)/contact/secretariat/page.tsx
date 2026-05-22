import { ContactDetail } from '@/components/content/contact-detail'
import { ContactForm } from '@/components/forms/contact-form'

export default function ContactSecretariatPage() {
  return (
    <>
      <ContactDetail slug="secretariat" />
      <div id="inquiry">
        <ContactForm />
      </div>
    </>
  )
}
