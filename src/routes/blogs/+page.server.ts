import fs from "fs/promises";
import path from "path";

export async function load() {
    const filePath = path.join(process.cwd(), "static", "latest_posts.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(raw);
    return { posts };
}