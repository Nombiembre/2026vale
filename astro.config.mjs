// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  // Everything is prerendered at build time except /api/visit.
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), mdx()]
});