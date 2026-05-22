import { z } from 'zod'

export const notificationBroadcastSchema = z.object({
  title: z.string().min(2).max(200),
  body: z.string().min(2).max(2000),
  href: z.string().max(500).optional(),
  kind: z.enum(['SYSTEM', 'ANNOUNCEMENT', 'SUMMIT']).optional(),
  userIds: z.array(z.string().cuid()).optional(),
  allMembers: z.boolean().optional(),
})
