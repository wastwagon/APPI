import { z } from 'zod'

export const cmsLocaleSchema = z.enum(['en', 'fr', 'ar'])

export const cmsSlugSchema = z
  .string()
  .min(1)
  .max(220)
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/, 'Invalid slug')

export const cmsFieldsSchema = z.record(z.unknown())

export const cmsPageUpsertSchema = z.object({
  slug: cmsSlugSchema,
  locale: cmsLocaleSchema,
  fields: cmsFieldsSchema,
  published: z.boolean().optional(),
})

export const cmsPagePatchSchema = z.object({
  fields: cmsFieldsSchema.optional(),
  published: z.boolean().optional(),
})

export type CmsLocale = z.infer<typeof cmsLocaleSchema>
export type CmsPageUpsert = z.infer<typeof cmsPageUpsertSchema>
