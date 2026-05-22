import { z } from 'zod';
export const mediaYoutubeSchema = z.object({
    url: z.string().url(),
    title: z.string().max(200).optional(),
    caption: z.string().max(500).optional(),
    folder: z.string().max(64).optional(),
});
export const mediaUpdateSchema = z.object({
    title: z.string().max(200).optional(),
    altText: z.string().max(300).optional(),
    caption: z.string().max(500).optional(),
    folder: z.string().max(64).optional(),
});
export const siteSettingsSchema = z.object({
    siteMode: z.enum(['live', 'under_construction']).optional(),
    constructionTitle: z.string().max(200).optional(),
    constructionMessage: z.string().max(2000).optional(),
});
