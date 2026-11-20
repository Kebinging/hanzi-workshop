import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH is set to "/<repo>/" for the GitHub Pages build.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  // The content bundle (HSK 1–4, several MB raw) ships inside the app chunk and is served from the offline cache.
  // json.stringify emits JSON.parse("…"), which parses much faster than an equivalent object literal.
  json: { stringify: true },
  build: { chunkSizeWarningLimit: 12000 },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Hanzi Workshop — HSK Reading & Grammar',
        short_name: 'Hanzi Workshop',
        description: 'Offline Mandarin reading & grammar trainer (HSK 3–5).',
        lang: 'en',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#faf7f2',
        theme_color: '#b4232c',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 16 * 1024 * 1024,
        runtimeCaching: [],
      },
    }),
  ],
});
