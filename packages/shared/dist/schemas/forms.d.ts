import { z } from 'zod';
export declare const formSubmissionSchema: z.ZodObject<{
    formType: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    /** Honeypot — must be empty */
    website: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    formType: string;
    payload: Record<string, unknown>;
    website?: string | undefined;
}, {
    formType: string;
    payload: Record<string, unknown>;
    website?: string | undefined;
}>;
export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>;
