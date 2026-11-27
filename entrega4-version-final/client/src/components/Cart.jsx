import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductImage } from '../utils/productImages'
import { formatPrice } from '../utils/cart'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Cart.css'

export default function Cart() {
  const {
    carrito: items,
    totales: { cantidad, total },
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
    finalizarCompra,
  } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [procesando, setProcesando] = useState(false)
  const [errorCompra, setErrorCompra] = useState('')

  async function handleFinalizarCompra() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/carrito' } } })
      return
    }

    setErrorCompra('')
    setProcesando(true)
    try {
      await finalizarCompra()
      navigate('/mis-pedidos')
    } catch (error) {
      setErrorCompra(error.message)
    } finally {
      setProcesando(false)
    }
  }

  return (
    <main className="cart-page">
      <header className="cart-heading">
        <span>PIEZAS PARA TU HOGAR</span>
        <h1>Tu carrito</h1>
        <p>{cantidad} {cantidad === 1 ? 'producto agregado' : 'productos agregados'}</p>
      </header>

      {items.length === 0 ? (
        <section className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Encontrá esa pieza que va a acompañarte por años.</p>
          <button className="jota-button" onClick={() => navigate('/productos')}>
            Explorar catálogo
          </button>
        </section>
      ) : (
        <div className="cart-layout">
          <ul className="cart-items">
            {items.map((item) => {
              const itemId = item.id ?? item._id
              return (
                <li key={itemId} className="cart-item">
                  <img src={getProductImage(item.nombre)} alt={item.nombre} />
                  <div className="cart-item-info">
                    <h2>{item.nombre}</h2>
                    <p>{formatPrice(item.precio)} por unidad</p>
                    <div className="cart-quantity" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                      <button
                        aria-label={`Restar una unidad de ${item.nombre}`}
                        disabled={item.cantidad === 1}
                        onClick={() => cambiarCantidad(itemId, -1)}
                      >
                        −
                      </button>
                      <span aria-label={`${item.cantidad} unidades`}>{item.cantidad}</span>
                      <button
                        aria-label={`Sumar una unidad de ${item.nombre}`}
                        onClick={() => cambiarCantidad(itemId, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-remove"
                      aria-label={`Eliminar ${item.nombre}`}
                      onClick={() => eliminarProducto(itemId)}
                    >
                      Eliminar
                    </button>
                  </div>
                  <strong className="cart-subtotal">{formatPrice(item.precio * item.cantidad)}</strong>
                </li>
              )
            })}
          </ul>

          <aside className="cart-summary" aria-label="Resumen del carrito">
            <h2>Resumen</h2>
            <div className="cart-total" aria-live="polite">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p>Precios en pesos argentinos. Envío a coordinar.</p>

            {errorCompra && (
              <p role="alert" style={{ color: '#b91c1c', fontWeight: 500 }}>
                {errorCompra}
              </p>
            )}

            <button
              className="jota-button"
              onClick={handleFinalizarCompra}
              disabled={procesando}
            >
              {procesando
                ? 'Procesando pedido...'
                : isAuthenticated
                  ? 'Finalizar compra'
                  : 'Iniciá sesión para comprar'}
            </button>

            <button
              className="jota-button jota-button-secondary"
              onClick={() => navigate('/productos')}
            >
              Seguir comprando
            </button>
            <button className="cart-remove" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}