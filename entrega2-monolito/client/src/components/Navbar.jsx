import './Navbar.css'
import logo from '../assets/logo.svg'
import { useState } from 'react'

export default function Navbar({ onNavigate, cantidadCarrito = 0, vista }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = (event, vista) => {
    event.preventDefault()
    onNavigate?.(vista)
    setMenuAbierto(false)
  }

  return (
    <nav className="navbar" aria-label="Menú principal">
        <div className="contenerdor-navbar">
            <a href="#" className="titulo-logo-navbar" onClick={(event) => navigate(event, 'inicio')}>
                <img src={logo} alt="Logo Mueblería Hermanos Jota" />
                Mueblería Hermanos Jota
            </a>
            <button className="navbar-toggle" aria-expanded={menuAbierto} aria-controls="menu-principal" onClick={() => setMenuAbierto(!menuAbierto)}>{menuAbierto ? 'Cerrar menú' : 'Menú ☰'}</button>
            <ul id="menu-principal" className={`navbar-nav ${menuAbierto ? 'is-open' : ''}`}>
                <li className="navbar-item">
                    <a href="#inicio" className="navbar-link" aria-current={vista === 'inicio' ? 'page' : undefined} onClick={(event) => navigate(event, 'inicio')}>Inicio</a>
                </li>
                <li className="navbar-item">
                    <a href="#catalogo" className="navbar-link" aria-current={vista === 'productos' ? 'page' : undefined} onClick={(event) => navigate(event, 'productos')}>Catálogo</a>
                </li>
                <li className="navbar-item">
                    <a href="#contacto" className="navbar-link" aria-current={vista === 'contacto' ? 'page' : undefined} onClick={(event) => navigate(event, 'contacto')}>Contacto</a>
                </li>
                <li className="navbar-item">
                    <a href="#carrito" className="navbar-link" aria-current={vista === 'carrito' ? 'page' : undefined} onClick={(event) => navigate(event, 'carrito')}>Carrito ({cantidadCarrito})</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}
