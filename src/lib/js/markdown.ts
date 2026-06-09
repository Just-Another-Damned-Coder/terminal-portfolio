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
let customMarked: any = null;

export async function parseWithHighlights(markdownString: string) {
    if (!clientHighlighter) {
        const { createHighlighter } = await import('shiki');
        const { marked } = await import('marked');
        const markedShiki = (await import('marked-shiki')).default || await import('marked-shiki');
        const markedKatex = (await import('marked-katex-extension')).default || await import('marked-katex-extension');

        clientHighlighter = await createHighlighter({
            themes: ['github-dark-high-contrast'],
            langs: ['javascript', 'typescript', 'bash', 'python', 'json', 'html', 'css']
        });

        // KaTeX must be applied before Shiki so math blocks are extracted
        // before code highlighting runs over the remaining markdown.
        marked.use(markedKatex({
            throwOnError: false,
            output: 'html'
        }));

        marked.use(markedShiki({
            highlight(code, lang) {
                const validLang = clientHighlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
                return clientHighlighter.codeToHtml(code, {
                    lang: validLang,
                    theme: 'github-dark-high-contrast'
                });
            }
        }));
        customMarked = marked;
    }
    return customMarked.parse(markdownString);
}