const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  'https://muebleria-hermanos-jota-g3.onrender.com'
).replace(/\/+$/, '')

export const PRODUCTS_API_URL = `${API_BASE_URL}/api/productos`
