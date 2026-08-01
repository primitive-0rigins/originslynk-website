// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fully static output. No adapter, no server runtime, no secrets in the build.
// The only external dependency at request time is whatever the consultation form
// posts to — see PUBLIC_FORM_ENDPOINT in .env.example.
export default defineConfig({
  site: 'https://originslynk.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    // One stylesheet rather than per-page <style> blocks: the site is small enough
    // that a single cached file beats avoiding unused rules.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
