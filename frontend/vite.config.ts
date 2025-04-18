import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: process.env.NODE_ENV === 'production' ? 'https://backend.malua.workers.dev' : 'http://localhost:8000',
				changeOrigin: true
			}
		}
	}
});
