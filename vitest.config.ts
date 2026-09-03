import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      'next/image': fileURLToPath(
        new URL('./tests/stubs/next-image.tsx', import.meta.url),
      ),
      'next/link': fileURLToPath(
        new URL('./tests/stubs/next-link.tsx', import.meta.url),
      ),
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
  },
});
