import { error } from "@sveltejs/kit";
import { Marked } from "marked";
import markedShiki from "marked-shiki";
import markedKatex from "marked-katex-extension";
import { createHighlighter } from "shiki";
import { isMermaidLanguage, renderMermaidBlock } from "$lib/js/mermaid";

let highlighter: any = null;
let customMarked: any = null;

async function getMarked() {
  if (!customMarked) {
    highlighter = await createHighlighter({
      themes: ["github-dark-high-contrast"],
      langs: ["json", "html", "bash", "python", "rust", "text"]
    });
    customMarked = new Marked(
      markedShiki({
        highlight: (code: string, lang: string) => {
          if (isMermaidLanguage(lang)) {
            return renderMermaidBlock(code);
          }

          const validLang = highlighter.getLoadedLanguages().includes(lang) ? lang : "text";
          return highlighter.codeToHtml(code, {
            lang: validLang,
            theme: "github-dark-high-contrast"
          });
        }
      }),
      markedKatex({ throwOnError: false })
    );
  }
  return customMarked;
}

/**
 * Strip YAML frontmatter (--- ... ---) from markdown.
 * gray-matter uses Node.js Buffer so it can't run in the browser.
 * All real metadata comes from latest_posts.json anyway.
 */
function stripFrontmatter(raw: string): string {
    return raw.replace(/^---[\r\n][\s\S]*?[\r\n]---[\r\n]?/, "");
}

export async function load({ fetch, params }) {
    const { slug } = params;

    const postsRes = await fetch('/latest_posts.json');
    const posts = await postsRes.json();

    const postMeta = posts.find((p: any) => p.slug === slug);
    if (!postMeta) throw error(404, "Blog post not found");

    // .md files live in static/blogs/... → served at /blogs/... on the host
    const mdUrl = '/' + postMeta.doc;
    const mdRes = await fetch(mdUrl);
    if (!mdRes.ok) throw error(404, "Blog post content not found");

    const fileContent = await mdRes.text();
    const content = stripFrontmatter(fileContent);
    const markedInstance = await getMarked();
    const contentHtml = String(await markedInstance.parse(content));

    return {
        post: {
            slug: postMeta.slug,
            title: postMeta.title,
            author: postMeta.author || "Unknown",
            date: postMeta.date || "",
            tags: postMeta.tags || [],
            description: postMeta.description || "",
            contentHtml,
            rawText: content
        }
    };
}
