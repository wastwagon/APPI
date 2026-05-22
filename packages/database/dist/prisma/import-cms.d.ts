import type { PrismaClient } from '@prisma/client';
export type CmsImportEntry = {
    slug: string;
    fields: Record<string, unknown>;
};
/** Collect CMS pages from nested message objects (content.*, pages.*, home). */
export declare function collectCmsPages(obj: Record<string, unknown>, baseSlug: string, acc: CmsImportEntry[]): void;
export declare function loadLocaleCmsEntries(locale: string): Promise<CmsImportEntry[]>;
export declare function importCmsFromMessages(prisma: PrismaClient): Promise<number>;
