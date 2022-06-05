/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import autoImport from 'unplugin-auto-import/vite'

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'leafvein-catalogue',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    },
    outDir: path.resolve(__dirname, 'lib')
  },
  plugins: [
    dts(),
    react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      },
      jsxImportSource: '@emotion/react'
    }),
    autoImport({
      imports: ['react', 'react-router-dom'],
      dts: './src/auto-imports.d.ts'
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
