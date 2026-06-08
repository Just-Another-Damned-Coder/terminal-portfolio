// src/routes/+page.ts
export async function load({ fetch }) {
    const response = await fetch('/latest_posts.json');
    const posts = await response.json();
    return { posts };
}
