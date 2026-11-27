import './Navbar.css'
import logo from '../assets/logo.svg'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { cantidad } = useCart()
  const navigate = useNavigate()

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const handleLogout = () => {
    logout()
    cerrarMenu()
    navigate('/')
  }

  const obtenerClase = ({ isActive }) =>
    isActive ? 'navbar-link activo' : 'navbar-link'

  return (
    <nav className="navbar" aria-label="Menú principal">
      <div className="contenerdor-navbar">
        <NavLink to="/" className="titulo-logo-navbar" onClick={cerrarMenu}>
          <img src={logo} alt="Logo Mueblería Hermanos Jota" />
          Mueblería Hermanos Jota
        </NavLink>

        <button
          className="navbar-toggle"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? 'Cerrar menú' : 'Menú ☰'}
        </button>

        <ul
          id="menu-principal"
          className={`navbar-nav ${menuAbierto ? 'is-open' : ''}`}
        >
          <li className="navbar-item">
            <NavLink to="/" end className={obtenerClase} onClick={cerrarMenu}>
              Inicio
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to="/productos" className={obtenerClase} onClick={cerrarMenu}>
              Catálogo
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to="/contacto" className={obtenerClase} onClick={cerrarMenu}>
              Contacto
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to="/carrito" className={obtenerClase} onClick={cerrarMenu}>
              Carrito ({cantidad})
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <NavLink to="/mis-pedidos" className={obtenerClase} onClick={cerrarMenu}>
                  Mis pedidos
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/perfil" className={obtenerClase} onClick={cerrarMenu}>
                  {user?.nombre || 'Mi perfil'}
                </NavLink>
              </li>
              <li className="navbar-item">
                <button
                  type="button"
                  className="navbar-link"
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <NavLink to="/login" className={obtenerClase} onClick={cerrarMenu}>
                  Ingresar
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/registro" className={obtenerClase} onClick={cerrarMenu}>
                  Registrarse
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}