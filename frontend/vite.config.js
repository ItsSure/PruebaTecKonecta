import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Cargar las variables de entorno adecuadas según el entorno
const env = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${env}` })

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT || 3000,
  },
})
