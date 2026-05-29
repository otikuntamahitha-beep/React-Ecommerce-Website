import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

import CartProvider from './context/CartContext'
import AuthProvider from './context/AuthContext'
import ThemeProvider from './context/ThemeContext'
import WishlistProvider from './context/WishlistContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ThemeProvider>

      <AuthProvider>

        <WishlistProvider>

          <CartProvider>

            <App />

            <ToastContainer />

          </CartProvider>

        </WishlistProvider>

      </AuthProvider>

    </ThemeProvider>

  </StrictMode>,
)