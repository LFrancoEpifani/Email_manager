import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  adapter: adapter({
    out: 'build' // La carpeta de salida de la construcción
  }),
  preprocess: vitePreprocess()
};
export default config;