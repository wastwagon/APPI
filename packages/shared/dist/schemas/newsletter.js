import { z } from 'zod';
export const newsletterSubscribeSchema = z.object({
    email: z.string().email().max(254),
    source: z.string().max(64).optional(),
});
