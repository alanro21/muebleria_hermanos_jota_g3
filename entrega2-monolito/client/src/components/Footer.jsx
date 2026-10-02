import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-section footer-about">
          <p className="footer-text">Hermanos Jota</p>
          <p>
            Recuperamos el oficio de hacer<br />
            muebles que acompañan la vida,<br />
            uniendo la herencia del taller<br />
            con una mirada actual y responsable. </p>
        </section>

        <section className="footer-section footer-collections">
          <p className="footer-text">Colecciones destacadas</p>
          <a href="#">Dormitorio</a>
          <a href="#">Mesas</a>
          <a href="#">Sillas</a>
          <a href="#">Sofás</a>
        </section>

        <section className="footer-section">
          <p className="footer-text">Taller</p>
          <p>Av. San Juan 2847</p>
          <p>Barrio de San Cristóbal, Buenos Aires</p>
          <p>Lunes a Viernes: 10:00 - 19:00</p>
          <a href="mailto:info@muebleriajota.com" className="footer-link">
            info@muebleriajota.com
          </a>
        </section>
      </div>

      <div className="footer-boton">
        <span>
           © 2026 Mueblería Hermanos Jota. Todos los derechos reservados. 
        </span>

        <nav aria-label="Enlaces legales">
          <a href="#">Términos y Condiciones</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Certificación Sustentable</a>
        </nav>
      </div>
    </footer>
  )
}