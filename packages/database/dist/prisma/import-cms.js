import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
const LOCALES = ['en', 'fr', 'ar'];
function findRepoRoot() {
    const candidates = [
        process.cwd(),
        path.resolve(process.cwd(), '../..'),
        path.resolve(process.cwd(), '../../..'),
    ];
    for (const root of candidates) {
        if (existsSync(path.join(root, 'apps/frontend/messages')))
            return root;
    }
    throw new Error('Could not find apps/frontend/messages (repo root)');
}
function getMessagesDir() {
    return path.join(findRepoRoot(), 'apps/frontend/messages');
}
/** Collect CMS pages from nested message objects (content.*, pages.*, home). */
export function collectCmsPages(obj, baseSlug, acc) {
    for (const [key, val] of Object.entries(obj)) {
        if (val === null || typeof val !== 'object' || Array.isArray(val))
            continue;
        const record = val;
        const slug = `${baseSlug}.${key}`;
        const hasNestedSection = Object.values(record).some((v) => typeof v === 'object' && v !== null && !Array.isArray(v));
        if (hasNestedSection) {
            acc.push({ slug, fields: record });
        }
        else {
            acc.push({ slug, fields: record });
        }
    }
}
function collectContentRoot(content) {
    const acc = [];
    for (const [section, val] of Object.entries(content)) {
        if (val === null || typeof val !== 'object' || Array.isArray(val))
            continue;
        const record = val;
        if (section === 'brief' || section === 'forms' || section === 'faq') {
            acc.push({ slug: `content.${section}`, fields: record });
            continue;
        }
        collectCmsPages(record, `content.${section}`, acc);
    }
    return acc;
}
async function loadJson(filePath) {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw);
}
export async function loadLocaleCmsEntries(locale) {
    const messagesDir = getMessagesDir();
    const basePath = path.join(messagesDir, `${locale}.json`);
    const contentPath = path.join(messagesDir, locale, 'content.json');
    const [base, contentFile] = await Promise.all([
        loadJson(basePath),
        loadJson(contentPath).catch(() => ({ content: {} })),
    ]);
    const entries = [];
    const content = (contentFile.content ?? contentFile);
    entries.push(...collectContentRoot(content));
    if (base.pages && typeof base.pages === 'object') {
        collectCmsPages(base.pages, 'pages', entries);
    }
    if (base.home && typeof base.home === 'object') {
        entries.push({ slug: 'home', fields: base.home });
    }
    for (const key of ['nav', 'footer', 'shell', 'forms', 'media']) {
        if (base[key] && typeof base[key] === 'object') {
            entries.push({ slug: key, fields: base[key] });
        }
    }
    return entries;
}
export async function importCmsFromMessages(prisma) {
    let count = 0;
    for (const locale of LOCALES) {
        const entries = await loadLocaleCmsEntries(locale);
        for (const { slug, fields } of entries) {
            const jsonFields = fields;
            await prisma.cmsPage.upsert({
                where: { slug_locale: { slug, locale } },
                create: { slug, locale, fields: jsonFields, published: true },
                update: { fields: jsonFields, published: true },
            });
            count++;
        }
    }
    return count;
}
