// vite.config.js
export default {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
           
          }
        }
      },
      chunkSizeWarningLimit: 50000
    }
  }