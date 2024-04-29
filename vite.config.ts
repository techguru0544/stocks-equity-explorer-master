import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import viteSvgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), viteSvgr()],
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@images': path.resolve(__dirname, './src/assets/img'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },
  server: {
    host: "0.0.0.0",
    port: 7575,
    open: true
  }
});
