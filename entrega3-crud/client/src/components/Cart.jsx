import { getProductImage } from '../utils/productImages'
import { cartTotals, formatPrice } from '../utils/cart'
import './Cart.css'

export default function Cart({ items, onQuantityChange, onRemove, onClear, onNavigate }) {
  const { cantidad, total } = cartTotals(items)
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
          <button className="jota-button" onClick={() => onNavigate('productos')}>Explorar catálogo</button>
        </section>
      ) : (
        <div className="cart-layout">
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={getProductImage(item.nombre)} alt={item.nombre} />
                <div className="cart-item-info">
                  <h2>{item.nombre}</h2>
                  <p>{formatPrice(item.precio)} por unidad</p>
                  <div className="cart-quantity" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                    <button aria-label={`Restar una unidad de ${item.nombre}`} disabled={item.cantidad === 1} onClick={() => onQuantityChange(item.id, -1)}>−</button>
                    <span aria-label={`${item.cantidad} unidades`}>{item.cantidad}</span>
                    <button aria-label={`Sumar una unidad de ${item.nombre}`} onClick={() => onQuantityChange(item.id, 1)}>+</button>
                  </div>
                  <button className="cart-remove" aria-label={`Eliminar ${item.nombre}`} onClick={() => onRemove(item.id)}>Eliminar</button>
                </div>
                <strong className="cart-subtotal">{formatPrice(item.precio * item.cantidad)}</strong>
              </li>
            ))}
          </ul>
          <aside className="cart-summary" aria-label="Resumen del carrito">
            <h2>Resumen</h2>
            <div className="cart-total" aria-live="polite"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <p>Precios en pesos argentinos. Envío a coordinar.</p>
            <button className="jota-button" onClick={() => onNavigate('contacto')}>Consultar por mi compra</button>
            <button className="jota-button jota-button-secondary" onClick={() => onNavigate('productos')}>Seguir comprando</button>
            <button className="cart-remove" onClick={onClear}>Vaciar carrito</button>
          </aside>
        </div>
      )}
    </main>
  )
}
