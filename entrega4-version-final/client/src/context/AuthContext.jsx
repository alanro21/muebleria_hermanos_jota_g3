import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function readStoredUser() {
  try {
    const raw = localStorage.getItem('jota-user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readStoredToken() {
  try {
    return localStorage.getItem('jota-token') || null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [token, setToken] = useState(readStoredToken)
  const [authLoading, setAuthLoading] = useState(false)

  function guardarSesion(nuevoToken, nuevoUsuario) {
    setToken(nuevoToken)
    setUser(nuevoUsuario)
    try {
      localStorage.setItem('jota-token', nuevoToken)
      localStorage.setItem('jota-user', JSON.stringify(nuevoUsuario))
    } catch {
    }
  }

  async function login({ email, password }) {
    setAuthLoading(true)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Credenciales inválidas')
      }

      const usuario = data.user || data.usuario || { email }
      guardarSesion(data.token, usuario)
      return data
    } finally {
      setAuthLoading(false)
    }
  }

  async function register({ nombre, email, password }) {
    setAuthLoading(true)
    try {
      const res = await fetch(`${API_BASE}/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || data.error || 'No se pudo completar el registro')
      }

      if (data.token) {
        const usuario = data.user || data.usuario || { nombre, email }
        guardarSesion(data.token, usuario)
      }

      return data
    } finally {
      setAuthLoading(false)
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
    try {
      localStorage.removeItem('jota-token')
      localStorage.removeItem('jota-user')
    } catch {
    }
  }

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    authLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}