import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD

import tailwindcss from '@tailwindcss/vite'
=======
import tailwindcss from '@tailwindcss/vite'

>>>>>>> 2128b8a6a8c45bc1520f65ca457246307ed2362a
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
