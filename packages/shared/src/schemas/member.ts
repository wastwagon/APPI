import { z } from 'zod'

export const profileUpdateSchema = z.object({
  fullName: z.string().min(1).max(200).optional(),
  partyAffiliation: z.string().max(200).optional(),
  country: z.string().max(100).optional(),
  bio: z.string().max(2000).optional(),
  phone: z.string().max(50).optional(),
  position: z.string().max(200).optional(),
  organization: z.string().max(200).optional(),
})

export const verificationSubmitSchema = z.object({
  nationalId: z.string().min(3).max(64),
})

export const summitRegistrationSchema = z.object({
  summitYear: z.string().max(8).default('2025'),
  organisation: z.string().min(1).max(200),
  country: z.string().min(1).max(100),
  delegationRole: z.string().max(200).optional(),
  dietaryNotes: z.string().max(500).optional(),
})

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(128),
})
