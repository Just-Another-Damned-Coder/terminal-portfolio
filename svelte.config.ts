import adapter from '@sveltejs/adapter-static'; // or your adapter
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const mdsvexOptions = {
  extensions: [".md"],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [ vitePreprocess(), mdsvex(mdsvexOptions)],
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};

export default config;