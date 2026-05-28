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
const FILESYSTEM_OUT = path.join(ROOT, 'src', 'lib', 'data', 'filesystem.json');
const LATEST_POSTS_OUT = path.join(STATIC_DIR, 'latest_posts.json');
const MAX_LATEST_POSTS = 9;

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
            const relBlogPath = path.relative(BLOGS_DIR, fullPath).replace(/\\/g, '/');
            const docPath = 'blogs/' + relBlogPath;

            dirEntries[entry.name] = {
                type: 'modal',
                doc: docPath,
            };

            const raw = fs.readFileSync(fullPath, 'utf-8');
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

function main() {
    // 1. Load base home.json
    const homeRaw = fs.readFileSync(HOME_JSON_PATH, 'utf-8');
    const filesystem: Record<string, Record<string, FilesystemEntry>> = JSON.parse(homeRaw);

    // 2. Ensure parent-directory entries for base entries that are directories
    const homeDir = filesystem['~/home'];
    const dirKeys: string[] = [];
    for (const [name, entry] of Object.entries(homeDir)) {
        const cleanName = name.replace(/\/$/, '');
        if (entry.type === 'directory') {
            const subPath = '~/home/' + cleanName;
            if (!filesystem[subPath]) {
                filesystem[subPath] = {};
            }
            // Add '..' to the subdirectory pointing back to ~/home
            filesystem[subPath]['..'] = { type: 'directory', target: '~/home' };
            dirKeys.push(cleanName);
        }
    }

    // 3. Scan blogs directory recursively
    const allPosts: PostMeta[] = [];
    if (fs.existsSync(BLOGS_DIR)) {
        scanBlogsRecursive(BLOGS_DIR, '~/home/blogs', filesystem, allPosts);
    }

    // 4. Sort posts by date descending, take latest MAX_LATEST_POSTS
    const sortedPosts = allPosts
        .filter(p => p.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, MAX_LATEST_POSTS);

    // 5. Write filesystem.json
    fs.writeFileSync(FILESYSTEM_OUT, JSON.stringify(filesystem, null, 4) + '\n', 'utf-8');
    console.log(`Written: ${FILESYSTEM_OUT}`);

    // 6. Write latest_posts.json
    fs.writeFileSync(LATEST_POSTS_OUT, JSON.stringify(sortedPosts, null, 4) + '\n', 'utf-8');
    console.log(`Written: ${LATEST_POSTS_OUT}`);
    console.log(`Posts indexed: ${allPosts.length}, latest shown: ${sortedPosts.length}`);
}

main();