import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MCPServer',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // A regex, not the bare specifier. src/index.ts imports the subpath
      // '@modelcontextprotocol/sdk/server/stdio.js', which the exact string
      // never matched — so the SDK was bundled instead of left external, and
      // Vite's library mode resolved it for the *browser*. That handed
      // StdioServerTransport a shimmed `process` with no `stdin`, and the built
      // server crashed on startup with "Cannot read properties of undefined
      // (reading 'on')" before it could serve anything.
      //
      // The SDK is a declared runtime dependency, so it belongs outside the
      // bundle: Node then loads it itself and process.stdin is the real one.
      external: [/^@modelcontextprotocol\/sdk/],
    },
    sourcemap: true,
    target: 'node18',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
