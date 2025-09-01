import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
    alias: {
      '@': '/src' // optional path alias for cleaner imports
    }
  },
  server: {
    port: 5173, // default Vite port
    open: true, // open browser on start
  }
});

