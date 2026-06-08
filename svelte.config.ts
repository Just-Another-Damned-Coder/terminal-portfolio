import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

let mdsvexProcessor;

const lazyMdsvex = {
  markup: async (args) => {
    if (!mdsvexProcessor) {
      const { mdsvex, escapeSvelte } = await import('mdsvex');
      const { createHighlighter } = await import('shiki');
      const remarkMath = (await import('remark-math')).default;
      const rehypeKatex = (await import('rehype-katex')).default;

      let highlighter;
      
      mdsvexProcessor = mdsvex({
        extensions: ['.svx', '.md'],
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        highlight: {
          highlighter: async (code, lang = 'text') => {
            if (!highlighter) {
              highlighter = await createHighlighter({
                themes: ['github-dark-high-contrast'],
                langs: ['bash', 'rust', 'json', 'python']
              });
            }
            const validLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
            const html = escapeSvelte(
              highlighter.codeToHtml(code, {
                lang: validLang,
                theme: 'github-dark-high-contrast'
              })
            );
            return `{@html \`${html}\` }`;
          }
        }
      });
    }
    return mdsvexProcessor.markup ? mdsvexProcessor.markup(args) : undefined;
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    lazyMdsvex, 
    vitePreprocess()
  ],

  extensions: ['.svelte', '.md', '.svx'],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Recommended for static sites
      precompress: false,
      strict: true
    }),
    paths: {
      relative: true
    },
    // If you are using aliases like $lib, ensure they are resolved
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;