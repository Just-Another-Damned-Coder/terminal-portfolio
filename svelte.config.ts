import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const mdsvexOptions = {
  extensions: ['.svx', '.md'],
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