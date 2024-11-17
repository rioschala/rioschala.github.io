import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        /^node:.*/, // Externalizes all modules starting with 'node:'
        '@astrojs/starlight/components' // Ensures this specific module is externalized
      ]
    }
  }
})