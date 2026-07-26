import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// fullpage.js es dependencia transitiva de @fullpage/react-fullpage (no está
// en package.json). pnpm no la deja resolvible como import directo, así que
// resolvemos su ruta real en disco a través del paquete que sí instalamos.
const require = createRequire(import.meta.url)
const fullpageCssPath = require.resolve('fullpage.js/dist/fullpage.min.css', {
  paths: [require.resolve('@fullpage/react-fullpage')],
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'fullpage.js/dist/fullpage.min.css': fullpageCssPath,
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'react', test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/ }],
        },
      }
    }
  },
})
