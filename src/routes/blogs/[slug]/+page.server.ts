import { error } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import markedShiki from "marked-shiki";
import markedKatex from "marked-katex-extension";
import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["github-dark-high-contrast"],
  langs: ["javascript", "typescript", "bash", "svelte", "json", "html", "css", "python", "markdown", "text"]
});

const marked = new Marked(
  markedShiki({
    highlight: (code, lang) => highlighter.codeToHtml(code, { lang: lang || "text", theme: "github-dark-high-contrast" })
  }),
  markedKatex({ throwOnError: false })
);

export async function load({ params }) {
    const { slug } = params;

    const filePath = path.join(process.cwd(), "static", "latest_posts.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(raw);

    const postMeta = posts.find(p => p.slug === slug);
    if (!postMeta) throw error(404, "Blog post not found");

    const docPath = path.join(process.cwd(), "static", postMeta.doc);
    let fileContent;
    try {
        fileContent = await fs.readFile(docPath, "utf-8");
    } catch {
        throw error(404, "Blog post content not found");
    }

    const { data, content } = matter(fileContent);
    const contentHtml = String(await marked.parse(content));

    return {
        post: {
            slug: postMeta.slug,
            title: data.title || postMeta.title,
            author: data.author || postMeta.author || "Unknown",
            date: data.date || postMeta.date || "",
            tags: data.tags || postMeta.tags || [],
            contentHtml,
            rawText: content
        }
    };
}