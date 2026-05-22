import { z } from 'zod';
export declare const mediaYoutubeSchema: z.ZodObject<{
    url: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
    folder: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string;
    title?: string | undefined;
    caption?: string | undefined;
    folder?: string | undefined;
}, {
    url: string;
    title?: string | undefined;
    caption?: string | undefined;
    folder?: string | undefined;
}>;
export declare const mediaUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    altText: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
    folder: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    caption?: string | undefined;
    folder?: string | undefined;
    altText?: string | undefined;
}, {
    title?: string | undefined;
    caption?: string | undefined;
    folder?: string | undefined;
    altText?: string | undefined;
}>;
export declare const siteSettingsSchema: z.ZodObject<{
    siteMode: z.ZodOptional<z.ZodEnum<["live", "under_construction"]>>;
    constructionTitle: z.ZodOptional<z.ZodString>;
    constructionMessage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    siteMode?: "live" | "under_construction" | undefined;
    constructionTitle?: string | undefined;
    constructionMessage?: string | undefined;
}, {
    siteMode?: "live" | "under_construction" | undefined;
    constructionTitle?: string | undefined;
    constructionMessage?: string | undefined;
}>;
