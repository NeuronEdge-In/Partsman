import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path of the deployed site.
// GitHub Pages project site → '/Partsman/'. Custom domain / root hosting → '/'.
// Override at build time with:  VITE_BASE_PATH=/ npm run build
const base = process.env.VITE_BASE_PATH || '/Partsman/';

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 5173, host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          catalog: ['./src/data/catalog.json'],
        },
      },
    },
  },
});
