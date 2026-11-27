import { createContext, useContext, useEffect, useState } from 'react'
import { addToCart, changeQuantity, cartTotals, readCart } from '../utils/cart'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(readCart)
  const [aviso, setAviso] = useState('')
  const { token, isAuthenticated } = useAuth()

  const totales = cartTotals(carrito)

  useEffect(() => {
    try {
      localStorage.setItem('jota-carrito', JSON.stringify(carrito))
    } catch {
    }
  }, [carrito])

  useEffect(() => {
    if (!aviso) return
    const timeout = setTimeout(() => setAviso(''), 3000)
    return () => clearTimeout(timeout)
  }, [aviso])

  function agregarProducto(producto) {
    setCarrito((actual) => addToCart(actual, producto))
    setAviso(`${producto.nombre} se agregó al carrito.`)
  }

  function cambiarCantidad(id, delta) {
    setCarrito((actual) => changeQuantity(actual, id, delta))
  }

  function eliminarProducto(id) {
    setCarrito((actual) => actual.filter((item) => (item.id ?? item._id) !== id))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  async function finalizarCompra() {
    if (!isAuthenticated || !token) {
      throw new Error('Tenés que iniciar sesión para finalizar la compra.')
    }

    if (carrito.length === 0) {
      throw new Error('Tu carrito está vacío.')
    }

    const res = await fetch(`${API_BASE}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: carrito.map((item) => ({
          productoId: item._id || item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
        })),
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || data.error || 'No se pudo procesar el pedido.')
    }

    vaciarCarrito()
    setAviso('¡Pedido realizado con éxito!')
    return data
  }

  const value = {
    carrito,
    totales,
    cantidad: totales.cantidad,
    aviso,
    setAviso,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
    finalizarCompra,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}