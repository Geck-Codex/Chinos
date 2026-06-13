import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('preload-helper')) return 'react'
          if (!id.includes('node_modules')) return
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (id.includes('react-dom') || id.includes('scheduler') || id.includes('/react/')) return 'react'
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('motion')) return 'motion'
        },
      },
    },
  },
})
