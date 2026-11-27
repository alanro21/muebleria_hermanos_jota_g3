const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export const PRODUCTS_API_URL = `${API_BASE_URL}/api/productos`
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`
export const ORDERS_API_URL = `${API_BASE_URL}/api/pedidos`
