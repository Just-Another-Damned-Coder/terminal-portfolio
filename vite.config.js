import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'@': '/src'
		}
	},
	server: {
		port: 5173,
		open: false,
	},
	optimizeDeps: {
		exclude: ['shiki', 'marked', 'marked-shiki', 'marked-katex-extension']
	}
});

