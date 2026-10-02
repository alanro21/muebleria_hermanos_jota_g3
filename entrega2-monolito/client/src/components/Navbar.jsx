import './Navbar.css'
import logo from '../assets/logo.svg'

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="contenerdor-navbar">
            <a href="#" className="titulo-logo-navbar">
                <img src={logo} alt="Logo Mueblería Hermanos Jota" />
                Mueblería Hermanos Jota
            </a>
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <a href="#" className="navbar-link">Inicio</a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link">Catálogo</a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link">Contacto</a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link">Carrito (0)</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}