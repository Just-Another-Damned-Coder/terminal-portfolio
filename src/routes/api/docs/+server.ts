import { json } from "@sveltejs/kit"



async function getDocuments() {
    let document = [];

    const paths = import.meta.glob('$lib/docs/*.md');
    console.log(paths);
    console.log("Hi");
    return paths
}


async function getAbout() {
    const docs = import.meta.glob('$lib/docs/about.md', { as: 'raw' });
    const entries = Object.entries(docs);
    if (entries.length === 0) {
    return null; // or throw new Error('No docs found');
    }

    const [path, resolver] = entries[0];
    const content = await resolver();

    return content; // This is the raw markdown string
}

export async function GET() {
  const about = await getAbout();
  return json({ about });
}