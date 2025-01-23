import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['localhost', '127.0.0.1', '5173-xolo978-attendance-manag-ehplngr9lk.app.codeanywhere.com'] // add your domain here if needed
	}
});
