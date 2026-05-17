import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        burger: resolve(__dirname, 'burger.html'),
        cart: resolve(__dirname, 'cart.html'),
        orderSuccess: resolve(__dirname, 'order-success.html'),
        pasta: resolve(__dirname, 'pasta.html'),
        payment: resolve(__dirname, 'payment.html'),
        pizza: resolve(__dirname, 'pizza.html')
      }
    }
  }
})

