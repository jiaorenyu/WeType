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
          'codemirror': ['@codemirror/view', '@codemirror/state', '@codemirror/lang-markdown', '@codemirror/theme-one-dark', '@codemirror/basic-setup'],
          'markdown': ['markdown-it', 'highlight.js'],
          'juice': ['juice']
        }
      }
    }
  }
})