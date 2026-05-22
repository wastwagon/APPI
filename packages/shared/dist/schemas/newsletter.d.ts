import { z } from 'zod';
export declare const newsletterSubscribeSchema: z.ZodObject<{
    email: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    source?: string | undefined;
}, {
    email: string;
    source?: string | undefined;
}>;
export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
