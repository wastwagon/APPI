import { z } from 'zod'

export const formSubmissionSchema = z.object({
  formType: z.string().min(1).max(64),
  payload: z.record(z.unknown()),
  /** Honeypot — must be empty */
  website: z.string().max(0).optional(),
})

export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>
