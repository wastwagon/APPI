import { z } from 'zod';
export declare const notificationBroadcastSchema: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodString;
    href: z.ZodOptional<z.ZodString>;
    kind: z.ZodOptional<z.ZodEnum<["SYSTEM", "ANNOUNCEMENT", "SUMMIT"]>>;
    userIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allMembers: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
    href?: string | undefined;
    kind?: "SYSTEM" | "ANNOUNCEMENT" | "SUMMIT" | undefined;
    userIds?: string[] | undefined;
    allMembers?: boolean | undefined;
}, {
    title: string;
    body: string;
    href?: string | undefined;
    kind?: "SYSTEM" | "ANNOUNCEMENT" | "SUMMIT" | undefined;
    userIds?: string[] | undefined;
    allMembers?: boolean | undefined;
}>;
