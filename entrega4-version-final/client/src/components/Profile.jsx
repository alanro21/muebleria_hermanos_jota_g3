import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <main className="account-page">
      <header className="account-header">
        <span className="auth-eyebrow">Área personal</span>
        <h1>Mi perfil</h1>
      </header>

      <section className="profile-card" aria-label="Datos de la cuenta">
        <h2>Datos del usuario</h2>
        <dl className="profile-details">
          <div>
            <dt>Nombre</dt>
            <dd>{user?.nombre || 'Sin especificar'}</dd>
          </div>
          <div>
            <dt>Correo electrónico</dt>
            <dd>{user?.email || 'Sin especificar'}</dd>
          </div>
        </dl>

        <div className="profile-actions">
          <Link to="/mis-pedidos" className="jota-button">
            Ver mis pedidos
          </Link>
          <Link to="/productos" className="jota-button jota-button-secondary">
            Ir al catálogo
          </Link>
          <button
            type="button"
            className="jota-button jota-button-secondary"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  )
}