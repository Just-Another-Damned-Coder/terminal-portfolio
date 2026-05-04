import { marked } from 'marked';
import markedShiki from 'marked-shiki';
import { createHighlighter } from 'shiki';

// Existing fetch function
export async function readMarkdownFile(targetPath: string) {
    let route = targetPath;
    if (targetPath.startsWith('~/home')) {
        route = targetPath.replace('~/home', '/blogs');
    } else if (!targetPath.startsWith('/')) {
        route = `/${targetPath}`;
    }
    const response = await fetch(route);
    if (!response.ok) {
        console.log("Tried to find the file, can't find it.");
        return "ERROR: File not found.";
    }
    return await response.text();
}

// NEW: Client-side singleton for highlighting
let clientHighlighter: any = null;

export async function parseWithHighlights(markdownString: string) {
    if (!clientHighlighter) {
        clientHighlighter = await createHighlighter({
            themes: ['material-theme'],
            langs: ['javascript', 'typescript', 'bash', 'python', 'json', 'html', 'css']
        });
        
        marked.use(markedShiki({
            highlight(code, lang) {
                const validLang = clientHighlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
                return clientHighlighter.codeToHtml(code, {
                    lang: validLang,
                    theme: 'material-theme'
                });
            }
        }));
    }
    return marked.parse(markdownString);
}