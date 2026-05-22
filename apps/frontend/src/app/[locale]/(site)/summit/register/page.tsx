import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { SummitRegisterForm } from '@/components/forms/summit-register-form'

export default function SummitRegisterPage() {
  return (
    <>
      <ProgrammeBrief
        namespace="content.summit.register"
        eyebrowKey="summit"
        imageKey="summit"
      />
      <SummitRegisterForm />
    </>
  )
}
