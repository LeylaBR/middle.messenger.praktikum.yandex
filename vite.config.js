import { resolve } from 'path';

export default {
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
};
