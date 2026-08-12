import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10kb
      deleteOriginFile: false,
    }),
    // Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    // Bundle visualizer (only in analyze mode)
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Keep large feature libraries out of the entry route. The JSX
        // runtime is explicitly grouped with React so it cannot pull a
        // markdown or animation chunk into the initial mobile request.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Rollup can otherwise place React's JSX runtime in the first
          // package chunk it encounters (previously Framer Motion).
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router')) return 'react-vendor';
          if (id.includes('/framer-motion/') || id.includes('/lottie-react/')) return 'animation-vendor';
          if (id.includes('/i18next') || id.includes('/react-i18next') || id.includes('/i18next-http-backend')) return 'i18n-vendor';
          if (id.includes('/swiper/') || id.includes('/lucide-react/')) return 'ui-vendor';
          if (id.includes('/react-markdown/') || id.includes('/remark-gfm/') || id.includes('/rehype-') || id.includes('/highlight.js/')) return 'markdown-vendor';
          if (id.includes('/@formspree/')) return 'form-vendor';
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Source maps for production debugging (optional, can be disabled)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'i18next',
      'react-i18next',
    ],
  },
})
