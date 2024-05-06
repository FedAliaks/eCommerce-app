import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setup.ts',
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
});
