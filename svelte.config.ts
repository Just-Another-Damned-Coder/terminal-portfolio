import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

let highlighter;

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.svx', '.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      if (!highlighter) {
        highlighter = await createHighlighter({
          themes: ['material-theme'],
          langs: ['bash', 'rust', 'json', 'python']
        });
      }

      // FIXED: getLoadedLanguages() instead of getLoadedLangs()
      const validLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
      
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang: validLang,
          theme: 'material-theme'
        })
      );

      return `{@html \`${html}\` }`;
    }
  }
};


/** @type {import('@sveltejs/kit').Config} */
const config = {
  // 1. Move mdsvex to the FRONT of the array
  // 2. Add .svelte to the mdsvex extensions if you have issues, 
  // but usually just .svx and .md is fine.
  preprocess: [
    mdsvex(mdsvexOptions), 
    vitePreprocess()
  ],

  extensions: ['.svelte', '.md', '.svx'],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // Recommended for static sites
      precompress: false,
      strict: true
    }),
    // If you are using aliases like $lib, ensure they are resolved
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;