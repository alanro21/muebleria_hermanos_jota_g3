import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ORDERS_API_URL } from '../utils/api'
import { formatPrice } from '../utils/cart'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function MyOrders() {
  const { token, logout } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${ORDERS_API_URL}/mis-pedidos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then(async (res) => {
        const data = await res.json()
        if (res.status === 401) {
          logout()
          throw new Error('Tu sesión expiró. Volvé a iniciar sesión.')
        }
        if (!res.ok) {
          throw new Error(data.error || 'No se pudieron cargar tus pedidos.')
        }
        return data
      })
      .then((data) => {
        setPedidos(data.pedidos || [])
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [token, logout])

  return (
    <main className="account-page">
      <header className="account-header">
        <span className="auth-eyebrow">Historial de compras</span>
        <h1>Mis pedidos</h1>
      </header>

      {loading && <p role="status">Cargando tus pedidos...</p>}

      {!loading && error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && pedidos.length === 0 && (
        <section className="profile-card">
          <h2>Todavía no hiciste ningún pedido</h2>
          <p>Cuando confirmes una compra desde tu carrito, la vas a ver reflejada acá.</p>
          <Link to="/productos" className="jota-button">
            Explorar catálogo
          </Link>
        </section>
      )}

      {!loading && !error && pedidos.length > 0 && (
        <ul className="orders-list">
          {pedidos.map((pedido) => {
            const fecha = pedido.createdAt
              ? new Date(pedido.createdAt).toLocaleDateString('es-AR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Fecha no disponible'

            return (
              <li key={pedido._id} className="order-card">
                <div className="order-header">
                  <strong>Pedido #{pedido._id.slice(-6).toUpperCase()}</strong>
                  <span>{fecha}</span>
                </div>

                <ul className="order-items">
                  {pedido.productos.map((item, idx) => (
                    <li key={item._id || idx} className="order-item">
                      <span>
                        {item.producto?.nombre || 'Producto'} × {item.cantidad}
                      </span>
                      <span>{formatPrice(item.precioUnitario * item.cantidad)}</span>
                    </li>
                  ))}
                </ul>

                <div className="order-total">
                  <span>Total</span>
                  <strong>{formatPrice(pedido.total)}</strong>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}