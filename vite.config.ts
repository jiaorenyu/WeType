import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'milkdown': ['@milkdown/kit', '@milkdown/react'],
          'markdown': ['markdown-it', 'highlight.js'],
          'juice': ['juice']
        }
      }
    }
  }
})
