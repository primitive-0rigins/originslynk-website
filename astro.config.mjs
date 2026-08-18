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
    // Cloudflare Pages serves route.html at /route without redirecting to /route/.
    // Keep the deployed paths aligned with canonical URLs and the sitemap.
    format: 'file',
    // One stylesheet rather than per-page <style> blocks: the site is small enough
    // that a single cached file beats avoiding unused rules.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
