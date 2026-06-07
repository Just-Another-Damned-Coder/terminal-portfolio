import { error } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import markedShiki from "marked-shiki";
import markedKatex from "marked-katex-extension";
import { createHighlighter } from "shiki";

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
        highlight: (code, lang) => highlighter.codeToHtml(code, { lang: lang || "text", theme: "github-dark-high-contrast" })
      }),
      markedKatex({ throwOnError: false })
    );
  }
  return customMarked;
}

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
    const markedInstance = await getMarked();
    const contentHtml = String(await markedInstance.parse(content));

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