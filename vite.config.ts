import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH is set to "/<repo>/" for the GitHub Pages build.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  // The content bundle (~2 MB raw, ~390 KB gzip) ships inside the app chunk; it is served from the offline cache.
  build: { chunkSizeWarningLimit: 2600 },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Hanzi Workshop — HSK 3 Reading & Grammar',
        short_name: 'Hanzi Workshop',
        description: 'Offline Mandarin reading & grammar trainer (HSK 3).',
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
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [],
      },
    }),
  ],
});
