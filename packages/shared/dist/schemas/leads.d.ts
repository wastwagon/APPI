import { z } from 'zod';
export declare const formSubmissionStatusSchema: z.ZodEnum<["new", "read", "archived"]>;
export declare const leadStatusUpdateSchema: z.ZodObject<{
    status: z.ZodEnum<["new", "read", "archived"]>;
}, "strip", z.ZodTypeAny, {
    status: "new" | "read" | "archived";
}, {
    status: "new" | "read" | "archived";
}>;
export type FormSubmissionStatusValue = z.infer<typeof formSubmissionStatusSchema>;
