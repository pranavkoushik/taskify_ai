
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: ['757c7fb3-f235-4cbc-bafc-2fad289cf279-00-1lhx95wn01af.worf.replit.dev', 'all']
  }
})
