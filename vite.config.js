import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 支持自定义域名和 GitHub Pages
  base: process.env.NODE_ENV === 'production' 
    ? (process.env.CUSTOM_DOMAIN ? '/' : '/loancalculator/')
    : '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
