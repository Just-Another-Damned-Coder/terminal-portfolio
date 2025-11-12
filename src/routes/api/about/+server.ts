// src/routes/api/about/+server.ts
import { json } from '@sveltejs/kit';
import matter from 'gray-matter';

export async function GET() {
  // Ensure import: 'default' so values are strings, not { default: string }
  const modules = import.meta.glob('$lib/docs/about.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });
  const raw = modules['/src/lib/docs/about.md'] as string;

  const { content, data } = matter(raw);
  return json({ content, metadata: data });
}
