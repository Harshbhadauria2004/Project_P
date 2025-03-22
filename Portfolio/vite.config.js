import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
    fs: {
      strict: false
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: 'dist'
  }
});
