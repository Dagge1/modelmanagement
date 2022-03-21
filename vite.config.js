import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// we have changed default Vite server port to 5000 due to the json-server which occupies port 3000
export default defineConfig({
  server: {
    port: 5000
  },
  plugins: [vue()]
})
