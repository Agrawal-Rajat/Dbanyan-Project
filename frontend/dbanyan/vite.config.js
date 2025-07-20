import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Performance optimizations
  build: {
    // Code splitting for better loading
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mantine/core', '@mantine/hooks'],
          animations: ['framer-motion'],
          utils: ['zustand', '@tanstack/react-query']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  
  // Development server optimization
  server: {
    hmr: {
      overlay: false // Disable error overlay for better dev experience
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
      'framer-motion',
      'zustand'
    ]
  }
})
