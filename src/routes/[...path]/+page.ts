import { error } from '@sveltejs/kit';

export async function load({ params }) {
  // Index ALL .svx and .md files in docs folder
  const modules = import.meta.glob('/src/lib/docs/**/*.{svx,md}');

  // Try .svx first, then .md
  const svxPath = `/src/lib/docs/${params.path}.svx`;
  const mdPath  = `/src/lib/docs/${params.path}.md`;

  const filePath = modules[svxPath] ? svxPath : modules[mdPath] ? mdPath : null;

  if (!filePath) {
    throw error(404, `Document not found: ${params.path}`);
  }

  const post = await modules[filePath]!() as any;

  return {
    component: post.default,
    meta: post.metadata ?? {}
  };
}