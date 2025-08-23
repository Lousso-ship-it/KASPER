import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { webcrypto as crypto } from 'node:crypto'

if (!globalThis.crypto) {
  globalThis.crypto = crypto
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js'
  }
})
