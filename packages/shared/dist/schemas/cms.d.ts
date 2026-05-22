import { z } from 'zod';
export declare const cmsLocaleSchema: z.ZodEnum<["en", "fr", "ar"]>;
export declare const cmsSlugSchema: z.ZodString;
export declare const cmsFieldsSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const cmsPageUpsertSchema: z.ZodObject<{
    slug: z.ZodString;
    locale: z.ZodEnum<["en", "fr", "ar"]>;
    fields: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    locale: "en" | "fr" | "ar";
    fields: Record<string, unknown>;
    published?: boolean | undefined;
}, {
    slug: string;
    locale: "en" | "fr" | "ar";
    fields: Record<string, unknown>;
    published?: boolean | undefined;
}>;
export declare const cmsPagePatchSchema: z.ZodObject<{
    fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    fields?: Record<string, unknown> | undefined;
    published?: boolean | undefined;
}, {
    fields?: Record<string, unknown> | undefined;
    published?: boolean | undefined;
}>;
export type CmsLocale = z.infer<typeof cmsLocaleSchema>;
export type CmsPageUpsert = z.infer<typeof cmsPageUpsertSchema>;
