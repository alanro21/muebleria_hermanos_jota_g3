export function addToCart(cart, product) {
  const exists = cart.some((item) => item.id === product.id)
  return exists
    ? cart.map((item) => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item)
    : [...cart, { ...product, cantidad: 1 }]
}

export function changeQuantity(cart, id, delta) {
  return cart.map((item) => item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item)
}

export function cartTotals(cart) {
  return cart.reduce((totals, item) => ({
    cantidad: totals.cantidad + item.cantidad,
    total: totals.total + item.precio * item.cantidad,
  }), { cantidad: 0, total: 0 })
}

export function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('jota-carrito') || '[]')
    if (!Array.isArray(saved)) return []
    const ids = new Set()
    return saved.filter((item) => {
      if (!item || !Number.isInteger(item.id) || typeof item.nombre !== 'string' ||
          !Number.isFinite(item.precio) || item.precio < 0 ||
          !Number.isSafeInteger(item.cantidad) || item.cantidad < 1 || ids.has(item.id)) return false
      ids.add(item.id)
      return true
    })
  } catch {
    return []
  }
}

export function formatPrice(value) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)
}
