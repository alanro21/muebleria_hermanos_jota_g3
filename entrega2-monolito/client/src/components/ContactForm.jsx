import { useState } from 'react'
import { validateContact } from '../utils/contact'
import './ContactForm.css'

const initialValues = { nombre: '', email: '', mensaje: '' }

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0]).focus()
      return
    }
    setSubmitted(true)
  }

  return (
    <main className="contacto-main">
      <section className="contacto-seccion showroom-taller" aria-labelledby="titulo-showroom">
        <h2 id="titulo-showroom">Showroom y taller</h2>
        <div className="showroom-card">
          <address className="showroom-info">
            <p className="showroom-nombre"><strong>Hermanos Jota — Casa Taller</strong></p>
            <p className="showroom-direccion">Av. San Juan 2847<br />C1232AAB — Barrio de San Cristóbal<br />Ciudad Autónoma de Buenos Aires<br />Argentina</p>
          </address>
          <div className="showroom-horarios">
            <p><strong>Horarios:</strong></p>
            <p>Lunes a Viernes: 10:00 - 19:00</p>
            <p>Sábados: 10:00 - 14:00</p>
          </div>
        </div>
      </section>
      <section className="contacto-seccion contacto-digital" aria-labelledby="titulo-contacto-digital">
        <h2 id="titulo-contacto-digital">Contacto digital</h2>
        <table className="tabla-contacto"><tbody>
          <tr><th scope="row">Sitio web</th><td><a href="https://www.hermanosjota.com.ar" target="_blank" rel="noopener noreferrer">www.hermanosjota.com.ar</a></td></tr>
          <tr><th scope="row">Email general</th><td><a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a></td></tr>
          <tr><th scope="row">Ventas</th><td><a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a></td></tr>
          <tr><th scope="row">Instagram</th><td><a href="https://instagram.com/hermanosjota_ba" target="_blank" rel="noopener noreferrer">@hermanosjota_ba</a></td></tr>
          <tr><th scope="row">WhatsApp</th><td><a href="https://wa.me/541145678900" target="_blank" rel="noopener noreferrer">+54 11 4567-8900</a></td></tr>
        </tbody></table>
      </section>
      <section className="contacto-seccion formulario-contacto" aria-labelledby="titulo-formulario">
        <h2 id="titulo-formulario">Hablemos de tu proyecto</h2>
        {submitted ? (
          <div className="contact-success" role="status">
            <h3>¡Gracias, {values.nombre.trim()}!</h3>
            <p>Completaste el formulario de demostración. No se envió ningún mensaje.</p>
            <p>Para comunicarte con el taller, escribí a <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>.</p>
            <button className="jota-button" onClick={() => { setValues(initialValues); setErrors({}); setSubmitted(false) }}>Escribir otra consulta</button>
          </div>
        ) : (
          <form className="form-jota" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input id="nombre" name="nombre" autoComplete="name" required minLength={3} maxLength={120} placeholder="Tu nombre" value={values.nombre} onChange={handleChange} aria-invalid={Boolean(errors.nombre)} aria-describedby={errors.nombre ? 'nombre-error' : undefined} />
                {errors.nombre && <span id="nombre-error" className="field-error">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" name="email" autoComplete="email" required maxLength={254} placeholder="tu@email.com" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={5} required minLength={10} maxLength={3000} placeholder="Contanos más sobre tu proyecto..." value={values.mensaje} onChange={handleChange} aria-invalid={Boolean(errors.mensaje)} aria-describedby={errors.mensaje ? 'mensaje-error' : undefined} />
              {errors.mensaje && <span id="mensaje-error" className="field-error">{errors.mensaje}</span>}
            </div>
            <p className="contact-note">Formulario de demostración: no envía correos. También podés contactarnos por los medios indicados arriba.</p>
            <button type="submit" className="jota-button">Escribinos</button>
          </form>
        )}
      </section>
    </main>
  )
}
