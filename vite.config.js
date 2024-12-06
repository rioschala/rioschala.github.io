// vite.config.js
export default {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'tldraw-chunk': ['tldraw']
          }
        }
      },
      chunkSizeWarningLimit: 50000
    }
  }