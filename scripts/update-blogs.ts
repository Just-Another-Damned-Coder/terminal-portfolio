import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as zlib from 'zlib';
import { promisify } from 'util';
import fm from 'front-matter';

const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(ROOT, 'static');
const BUILD_DIR = path.join(ROOT, 'build');

async function compressFile(filePath: string) {
    const content = fs.readFileSync(filePath);
    
    // Create .gz with max compression
    const gzContent = await gzip(content, { level: 9 });
    fs.writeFileSync(`${filePath}.gz`, gzContent);
    
    // Create .br with max compression
    const brContent = await brotli(content, {
        params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        },
    });
    fs.writeFileSync(`${filePath}.br`, brContent);
    
    console.log(`Compressed: ${path.relative(ROOT, filePath)} (.gz, .br)`);
}

function isDraftMarkdownFile(filePath: string): boolean {
    if (!filePath.endsWith('.md')) return false;

    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = fm<Record<string, any>>(raw);
        return parsed.attributes?.draft === true;
    } catch {
        return false;
    }
}

function copyRecursiveSync(src: string, dest: string) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        if (isDraftMarkdownFile(src)) {
            console.log(`Skipped draft: ${path.relative(ROOT, src)}`);
            return;
        }
        fs.copyFileSync(src, dest);
    }
}

async function compressBlogsDirAsync(dir: string) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            await compressBlogsDirAsync(fullPath);
        } else if (!item.name.endsWith('.gz') && !item.name.endsWith('.br')) {
            await compressFile(fullPath);
        }
    }
}

async function main() {
    console.log('1. Running create-fs to update JSON files...');
    execSync('npm run create-fs', { stdio: 'inherit' });

    if (!fs.existsSync(BUILD_DIR)) {
        console.error("\nError: Build directory doesn't exist. Please run 'npm run build' at least once before using this script.");
        process.exit(1);
    }

    console.log('\n2. Copying updated metadata files to build folder...');
    const filesToCopy = [
        'filesystem.json',
        'latest_posts.json',
        'sitemap.xml',
        'rss.xml'
    ];

    for (const file of filesToCopy) {
        const src = path.join(STATIC_DIR, file);
        const dest = path.join(BUILD_DIR, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`Copied: ${file} to build/`);
            await compressFile(dest);
        }
    }

    console.log('\n3. Copying and compressing blogs directory...');
    const srcBlogs = path.join(STATIC_DIR, 'blogs');
    const destBlogs = path.join(BUILD_DIR, 'blogs');

    if (fs.existsSync(destBlogs)) {
        fs.rmSync(destBlogs, { recursive: true, force: true });
    }
    
    // Copy the uncompressed files
    copyRecursiveSync(srcBlogs, destBlogs);
    
    // Compress everything in build/blogs
    await compressBlogsDirAsync(destBlogs);

    console.log('\nDone! You can now deploy the updated files in the build/ folder without running a full build.');
}

main().catch(console.error);
