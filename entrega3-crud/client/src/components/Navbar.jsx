
import './Navbar.css'
import logo from '../assets/logo.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar({ cantidadCarrito = 0 }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const obtenerClase = ({ isActive }) =>
    isActive ? 'navbar-link activo' : 'navbar-link'

  return (
    <nav className="navbar" aria-label="Menú principal">
      <div className="contenerdor-navbar">

        <NavLink
          to="/"
          className="titulo-logo-navbar"
          onClick={cerrarMenu}
        >
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
            <NavLink
              to="/"
              end
              className={obtenerClase}
              onClick={cerrarMenu}
            >
              Inicio
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink
              to="/productos"
              className={obtenerClase}
              onClick={cerrarMenu}
            >
              Catálogo
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink
              to="/contacto"
              className={obtenerClase}
              onClick={cerrarMenu}
            >
              Contacto
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink
              to="/carrito"
              className={obtenerClase}
              onClick={cerrarMenu}
            >
              Carrito ({cantidadCarrito})
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  )
}
