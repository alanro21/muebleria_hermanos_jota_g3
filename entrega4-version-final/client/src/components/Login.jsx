import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const { login, isAuthenticated, authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const mensajeRegistro = location.state?.mensaje || ''
  const destino = location.state?.from?.pathname || '/perfil'

  if (isAuthenticated) {
    return <Navigate to={destino} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      await login({ email: email.trim(), password })
      navigate(destino, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <span className="auth-eyebrow">Tu cuenta</span>
        <h1 id="login-title">Iniciar sesión</h1>
        <p>Ingresá para gestionar tus pedidos y finalizar tus compras.</p>

        {mensajeRegistro && (
          <p className="auth-success" role="status">
            {mensajeRegistro}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="jota-button" disabled={authLoading}>
            {authLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Todavía no tenés cuenta? <Link to="/registro">Registrate acá</Link>
        </p>
      </section>
    </main>
  )
}