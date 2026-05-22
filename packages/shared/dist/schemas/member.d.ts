import { z } from 'zod';
export declare const profileUpdateSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    partyAffiliation: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    organization: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullName?: string | undefined;
    partyAffiliation?: string | undefined;
    country?: string | undefined;
    bio?: string | undefined;
    phone?: string | undefined;
    position?: string | undefined;
    organization?: string | undefined;
}, {
    fullName?: string | undefined;
    partyAffiliation?: string | undefined;
    country?: string | undefined;
    bio?: string | undefined;
    phone?: string | undefined;
    position?: string | undefined;
    organization?: string | undefined;
}>;
export declare const verificationSubmitSchema: z.ZodObject<{
    nationalId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    nationalId: string;
}, {
    nationalId: string;
}>;
export declare const summitRegistrationSchema: z.ZodObject<{
    summitYear: z.ZodDefault<z.ZodString>;
    organisation: z.ZodString;
    country: z.ZodString;
    delegationRole: z.ZodOptional<z.ZodString>;
    dietaryNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    country: string;
    summitYear: string;
    organisation: string;
    delegationRole?: string | undefined;
    dietaryNotes?: string | undefined;
}, {
    country: string;
    organisation: string;
    summitYear?: string | undefined;
    delegationRole?: string | undefined;
    dietaryNotes?: string | undefined;
}>;
export declare const passwordChangeSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
