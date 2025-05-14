import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    visualizer({ filename: 'stats.html' }), // Generate visual build report
		// {
		// 	name: 'log-chunk-sizes',
		// 	generateBundle(outputOptions, bundle) {
		// 		for (const [fileName, info] of Object.entries(bundle)) {
		// 			if (info.type === 'chunk') {
		// 				console.log(`Chunk ${fileName}: ${(info.code.length / 1024).toFixed(2)} kB`);
		// 			}
		// 		}
		// 	}
		// }
  ],
	server: {
		host: '0.0.0.0', // Bind to all network interfaces
		port: 5173,      // Default Vite port
	},
	logLevel: 'info',
	build: {
		modulePreload: false,
		sourcemap: true,
		minify: false,
		reportCompressedSize: false,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('@sveltejs/kit')) return 'vendor-sveltekit';
						if (id.includes('svelty-picker')) return 'vendor-svelty-picker';
						if (id.includes('svelte')) return 'vendor-svelte';
						if (id.includes('tailwind')) return 'vendor-tailwind';
						return 'vendor-other';
					}
				}
			}
		}
	}
});
