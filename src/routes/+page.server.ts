// src/routes/+page.server.js
import fs from "fs/promises";
import path from "path";

export async function load() {
    console.log("Loading latest posts...", Date.now());
    const filePath = path.join(process.cwd(), "static", "latest_posts.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(raw);
    console.log("Posts loaded:", Date.now());
    return { posts };
}