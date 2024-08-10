/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [remix()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
