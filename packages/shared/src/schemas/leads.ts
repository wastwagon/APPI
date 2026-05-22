import { z } from 'zod'

export const formSubmissionStatusSchema = z.enum(['new', 'read', 'archived'])

export const leadStatusUpdateSchema = z.object({
  status: formSubmissionStatusSchema,
})

export type FormSubmissionStatusValue = z.infer<typeof formSubmissionStatusSchema>
