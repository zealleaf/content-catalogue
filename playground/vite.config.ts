import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../packages/catalogue/src')
    }
  },
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      },
      jsxImportSource: '@emotion/react'
    })
  ]
})
