import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Register() {
  const { register, isAuthenticated, authLoading } = useAuth()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/perfil" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    try {
      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        password,
      })
      navigate('/login', {
        state: { mensaje: '¡Cuenta creada con éxito! Ahora iniciá sesión.' },
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <span className="auth-eyebrow">Sumate a Hermanos Jota</span>
        <h1 id="register-title">Crear cuenta</h1>
        <p>Registrate para comprar y llevar el seguimiento de tus pedidos.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="register-nombre">Nombre completo</label>
            <input
              id="register-nombre"
              type="text"
              required
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María González"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Correo electrónico</label>
            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Contraseña</label>
            <input
              id="register-password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-confirm">Confirmar contraseña</label>
            <input
              id="register-confirm"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repetí tu contraseña"
            />
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="jota-button" disabled={authLoading}>
            {authLoading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </section>
    </main>
  )
}