import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(ROOT, 'static');
const BLOGS_DIR = path.join(STATIC_DIR, 'blogs');
const HOME_JSON_PATH = path.join(STATIC_DIR, 'home.json');
const FILESYSTEM_OUT = path.join(ROOT, 'static', 'filesystem.json');
const LATEST_POSTS_OUT = path.join(STATIC_DIR, 'latest_posts.json');
const SITEMAP_OUT = path.join(STATIC_DIR, 'sitemap.xml');
const RSS_OUT = path.join(STATIC_DIR, 'rss.xml');

const MAX_LATEST_POSTS = 9;
const SITE_URL = 'https://morisjohnson.in';
const SITE_TITLE = 'Moris Johnson';
const SITE_DESCRIPTION = 'A terminal-inspired portfolio and blog.';

interface PostMeta {
    title: string;
    author: string;
    date: string;
    tags: string[];
    description: string;
    slug: string;
    doc: string;
}

interface FilesystemEntry {
    type: 'directory' | 'link' | 'modal';
    href?: string;
    doc?: string;
    docPath?: string;
    target?: string;
}

function isDraftPost(raw: string): boolean {
    try {
        const parsed = fm<Record<string, any>>(raw);
        return parsed.attributes?.draft === true;
    } catch {
        return false;
    }
}

function scanBlogsRecursive(
    dirPath: string,
    fsysPath: string,
    filesystem: Record<string, Record<string, FilesystemEntry>>,
    posts: PostMeta[],
): void {
    if (!fs.existsSync(dirPath)) return;

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const dirEntries: Record<string, FilesystemEntry> = {};

    for (const entry of entries) {
        if (entry.name === '..') continue;

        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            dirEntries[entry.name] = { type: 'directory' };

            const childFsysPath = fsysPath + '/' + entry.name;
            scanBlogsRecursive(fullPath, childFsysPath, filesystem, posts);

            if (!filesystem[childFsysPath]) {
                filesystem[childFsysPath] = {};
            }
            filesystem[childFsysPath]['..'] = { type: 'directory', target: fsysPath };
        } else if (entry.name.endsWith('.md')) {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            if (isDraftPost(raw)) {
                continue;
            }

            const relBlogPath = path.relative(BLOGS_DIR, fullPath).replace(/\\/g, '/');
            const docPath = 'blogs/' + relBlogPath;

            dirEntries[entry.name] = {
                type: 'modal',
                doc: docPath,
            };

            try {
                const parsed = fm<Record<string, any>>(raw);
                const attrs = parsed.attributes || {};
                posts.push({
                    title: attrs.title || entry.name.replace('.md', ''),
                    author: attrs.author || 'Unknown',
                    date: attrs.date ? new Date(attrs.date).toISOString() : '',
                    tags: Array.isArray(attrs.tags) ? attrs.tags : [],
                    description: attrs.description || '',
                    slug: attrs.slug || '',
                    doc: docPath,
                });
            } catch {
                posts.push({
                    title: entry.name.replace('.md', ''),
                    author: 'Unknown',
                    date: '',
                    tags: [],
                    description: '',
                    slug: '',
                    doc: docPath,
                });
            }
        }
    }

    if (Object.keys(dirEntries).length > 0) {
        if (!filesystem[fsysPath]) {
            filesystem[fsysPath] = {};
        }
        Object.assign(filesystem[fsysPath], dirEntries);
    }
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateSitemap(posts: PostMeta[]): string {
    const staticPages = [
        { url: '/',        priority: '1.0', changefreq: 'weekly' },
        { url: '/blogs',   priority: '0.9', changefreq: 'daily' },
        { url: '/about',   priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    ];

    const staticUrls = staticPages.map(p => `
  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

    const postUrls = posts.map(p => `
  <url>
    <loc>${SITE_URL}/blogs/${p.slug}</loc>
    ${p.date ? `<lastmod>${p.date.split('T')[0]}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;
}

function generateRss(posts: PostMeta[]): string {
    const buildDate = new Date().toUTCString();

    const items = posts.map(p => {
        const pubDate = new Date(p.date).toUTCString();
        const link = `${SITE_URL}/blogs/${p.slug}`;
        const description = escapeXml(p.description || p.title);
        const categories = p.tags.map(t => `      <category>${escapeXml(t)}</category>`).join('\n');
        return `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <description>${description}</description>
    <author>${escapeXml(p.author)}</author>
    <pubDate>${pubDate}</pubDate>
${categories}
  </item>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

function main() {
    // 1. Load base home.json
    const homeRaw = fs.readFileSync(HOME_JSON_PATH, 'utf-8');
    const filesystem: Record<string, Record<string, FilesystemEntry>> = JSON.parse(homeRaw);

    // 2. Ensure parent-directory entries for base entries that are directories
    const homeDir = filesystem['~/home'];
    for (const [name, entry] of Object.entries(homeDir)) {
        const cleanName = name.replace(/\/$/, '');
        if (entry.type === 'directory') {
            const subPath = '~/home/' + cleanName;
            if (!filesystem[subPath]) {
                filesystem[subPath] = {};
            }
            filesystem[subPath]['..'] = { type: 'directory', target: '~/home' };
        }
    }

    // 3. Scan blogs directory recursively
    const allPosts: PostMeta[] = [];
    if (fs.existsSync(BLOGS_DIR)) {
        scanBlogsRecursive(BLOGS_DIR, '~/home/blogs', filesystem, allPosts);
    }

    // 4. Sort all posts by date descending
    const allSorted = allPosts
        .filter(p => p.date && p.slug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // 5. Write filesystem.json
    fs.writeFileSync(FILESYSTEM_OUT, JSON.stringify(filesystem, null, 4) + '\n', 'utf-8');
    console.log(`Written: ${FILESYSTEM_OUT}`);

    // 6. Write latest_posts.json (capped at MAX_LATEST_POSTS)
    const latestPosts = allSorted.slice(0, MAX_LATEST_POSTS);
    fs.writeFileSync(LATEST_POSTS_OUT, JSON.stringify(latestPosts, null, 4) + '\n', 'utf-8');
    console.log(`Written: ${LATEST_POSTS_OUT}`);
    console.log(`Posts indexed: ${allPosts.length}, latest shown: ${latestPosts.length}`);

    // 7. Write sitemap.xml (all posts)
    fs.writeFileSync(SITEMAP_OUT, generateSitemap(allSorted), 'utf-8');
    console.log(`Written: ${SITEMAP_OUT} (${allSorted.length} posts)`);

    // 8. Write rss.xml (all posts)
    fs.writeFileSync(RSS_OUT, generateRss(allSorted), 'utf-8');
    console.log(`Written: ${RSS_OUT} (${allSorted.length} items)`);
}

main();
