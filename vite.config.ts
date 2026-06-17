import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        haushalt: resolve(__dirname, 'haushalt.html'),
        sproetze: resolve(__dirname, 'sproetze.html'),
        quellen: resolve(__dirname, 'quellen.html'),
      },
    },
  },
})
