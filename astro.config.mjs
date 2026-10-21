import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // asgi.app registered 2026-10-21 via GitHub Student Pack (Name.com), DNS on Cloudflare
  site: 'https://asgi.app',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
