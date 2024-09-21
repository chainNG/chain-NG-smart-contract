import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@mui/icons-material': '@mui/icons-material/esm/index.js',
    },
  },
  build: {
    rollupOptions: {
      external: ['slick-carousel'], 
    },
  },
});
