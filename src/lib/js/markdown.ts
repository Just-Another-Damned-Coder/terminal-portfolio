// Inside your Parser's 'cd' or 'ls' logic

export async function fetchDirectoryIndex(targetPath: string) {
    // Convert terminal path (~/home/blogs) to static route (/content/blogs/index.json)
    const route = targetPath.replace('~/home', '/blog') + '/index.json';
    
    try {
        const response = await fetch(route);
        if (!response.ok) return null; // 404 means directory doesn't exist
        
        return await response.json(); // Returns { files: [...], directories: [...] }
    } catch {
        return null;
    }
}
export async function readMarkdownFile(targetPath: string) {
    let route = targetPath;
    
    // Path resolution
    if (targetPath.startsWith('~/home')) {
        route = targetPath.replace('~/home', '/blogs');
    } else if (!targetPath.startsWith('/')) {
        route = `/${targetPath}`;
    }
    
    const response = await fetch(route);
    if (!response.ok) {
        console.log("Tried to find the file, can't find it.")
        return "ERROR: File not found.";
    }
    
    const rawMarkdownText = await response.text();
    
    // Strip the YAML frontmatter (everything between the top --- and the next ---)
    // const cleanText = rawMarkdownText.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    
    return rawMarkdownText;
}