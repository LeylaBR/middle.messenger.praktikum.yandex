import { resolve } from 'path';

export default {
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {},
    },
    server: {
        port: 3000,
        open: true,
    },
};
