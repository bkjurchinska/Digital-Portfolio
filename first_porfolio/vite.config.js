import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the built dist/index.html works both when opened
  // directly from disk (file://) and when served from any path/subpath --
  // with the default "/" base, opening dist/index.html by double-clicking it
  // shows a blank page because the browser looks for assets at the drive
  // root instead of next to the file.
  base: './',
  plugins: [react()],
  css: {
    modules: 
    {
      localsConvention: "camelCase"
    },
  }
})
