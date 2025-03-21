import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
import path from 'path'
import fs from 'fs'

// Custom plugin to handle ?base64 imports
function base64ImagesPlugin() {
  return {
    name: 'vite-plugin-base64-images',
    async transform(src, id) {
      // Check if this is a ?base64 request
      if (id.endsWith('?base64')) {
        const filePath = id.replace('?base64', '')
        // For Windows paths
        const normalizedPath = filePath.startsWith('/') ? filePath.slice(1) : filePath
        
        try {
          // Read the file and convert to base64
          const data = await fs.promises.readFile(normalizedPath)
          const base64 = data.toString('base64')
          return {
            code: `export default "${base64}"`,
            map: null
          }
        } catch (error) {
          console.error('Failed to load image as base64:', error)
          return {
            code: `export default ""`,
            map: null
          }
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 60,
      },
      pngquant: {
        quality: [0.7, 0.8],
        speed: 4,
      },
      webp: {
        quality: 70,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-lazy-load-image-component'],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable source maps for better debugging
    sourcemap: false,
    // Minify the bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    // Enable file caching for development
    hmr: true,
    headers: {
      'Cache-Control': 'max-age=31536000',
    },
  },
  // Configure image optimization
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.svg'],
  optimizeDeps: {
    include: ['react-lazy-load-image-component'],
  },
})
