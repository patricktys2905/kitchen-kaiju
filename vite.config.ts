import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Relative base so the build works from any static host path (e.g. GitHub Pages /kitchen-kaiju/).
  base: './',
  // host: true exposes the dev server on your Wi-Fi so phones/tablets on the same network can play.
  server: { port: 5180, host: true, open: false },
  preview: { host: true },
  build: { chunkSizeWarningLimit: 2500 },
  plugins: [
    VitePWA({
      // 'prompt' so a new version never reloads mid-match; src/pwa.ts applies it from the menu.
      registerType: 'prompt',
      includeAssets: ['icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        id: './',
        name: 'Kitchen Kaiju',
        short_name: 'Kitchen Kaiju',
        description: 'Tiny monsters brawl on a giant dinner table with throwable cutlery. Plays offline.',
        lang: 'en',
        start_url: './',
        scope: './',
        display: 'fullscreen',
        orientation: 'landscape',
        theme_color: '#140e0a',
        background_color: '#140e0a',
        categories: ['games', 'entertainment'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the whole game so it runs with no connection after the first visit.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
      },
    }),
  ],
});
