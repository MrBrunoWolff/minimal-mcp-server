import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MCPServer',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['@modelcontextprotocol/sdk'],
      output: {
        globals: {
          '@modelcontextprotocol/sdk': 'MCPSdk'
        }
      }
    },
    sourcemap: true,
    target: 'node18'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
