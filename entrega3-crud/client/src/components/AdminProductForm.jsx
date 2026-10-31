import { useRef, useState } from 'react'
import { PRODUCTS_API_URL } from '../utils/api'
import './AdminProductForm.css'

const valoresIniciales = {
  nombre: '',
  descripcion: '',
  categoria: '',
  precio: '',
  stock: '0',
  imagenUrl: '',
}

export default function AdminProductForm() {
  const [values, setValues] = useState(valoresIniciales)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const submitLock = useRef(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setFeedback(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitLock.current) return

    const nombre = values.nombre.trim()
    const precio = Number(values.precio)
    const stock = Number(values.stock)
    const imagenUrl = values.imagenUrl.trim()

    if (!nombre || values.precio === '' || !Number.isFinite(precio) || precio < 0) {
      setFeedback({ type: 'error', message: 'Ingresá un nombre y un precio válido (igual o mayor a cero).' })
      return
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setFeedback({ type: 'error', message: 'El stock debe ser un número entero igual o mayor a cero.' })
      return
    }

    if (imagenUrl) {
      try {
        new URL(imagenUrl)
      } catch {
        setFeedback({ type: 'error', message: 'Ingresá una URL válida para la imagen.' })
        return
      }
    }

    submitLock.current = true
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch(PRODUCTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          descripcion: values.descripcion.trim(),
          precio,
          stock,
          imagenUrl,
        }),
      })

      let result
      try {
        result = await response.json()
      } catch {
        throw new Error('El servidor devolvió una respuesta que no se pudo interpretar.')
      }

      if (!response.ok) {
        throw new Error(result?.error || `No se pudo crear el producto (HTTP ${response.status}).`)
      }

      setValues(valoresIniciales)
      setFeedback({ type: 'success', message: `El producto “${nombre}” se creó correctamente.` })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al crear el producto.',
      })
    } finally {
      submitLock.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <main className="admin-product-page">
      <header className="admin-product-heading">
        <span className="admin-product-eyebrow">Administración del catálogo</span>
        <h1>Nuevo producto</h1>
        <p>Sumá una nueva pieza al catálogo de Hermanos Jota.</p>
      </header>

      <form className="admin-product-form" onSubmit={handleSubmit}>
        <div className="admin-product-fields">
          <div className="admin-product-field">
            <label htmlFor="producto-nombre">Nombre *</label>
            <input
              id="producto-nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              required
              maxLength={120}
              autoComplete="off"
            />
          </div>

          <div className="admin-product-field">
            <label htmlFor="producto-categoria">Categoría</label>
            <input
              id="producto-categoria"
              name="categoria"
              value={values.categoria}
              onChange={handleChange}
              maxLength={80}
              aria-describedby="producto-categoria-ayuda"
            />
            <small id="producto-categoria-ayuda">
              El modelo actual del backend no incluye categoría; este dato no se guardará.
            </small>
          </div>

          <div className="admin-product-field admin-product-field-wide">
            <label htmlFor="producto-descripcion">Descripción</label>
            <textarea
              id="producto-descripcion"
              name="descripcion"
              value={values.descripcion}
              onChange={handleChange}
              rows={5}
              maxLength={2000}
            />
          </div>

          <div className="admin-product-field">
            <label htmlFor="producto-precio">Precio *</label>
            <input
              id="producto-precio"
              name="precio"
              type="number"
              value={values.precio}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              inputMode="decimal"
            />
          </div>

          <div className="admin-product-field">
            <label htmlFor="producto-stock">Stock</label>
            <input
              id="producto-stock"
              name="stock"
              type="number"
              value={values.stock}
              onChange={handleChange}
              min="0"
              step="1"
              inputMode="numeric"
            />
          </div>

          <div className="admin-product-field admin-product-field-wide">
            <label htmlFor="producto-imagen">Imagen (URL)</label>
            <input
              id="producto-imagen"
              name="imagenUrl"
              type="url"
              value={values.imagenUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <small>Ingresá un enlace público a la imagen del producto.</small>
          </div>
        </div>

        {feedback && (
          <p
            className={`admin-product-feedback admin-product-feedback-${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
          >
            {feedback.message}
          </p>
        )}

        <button className="jota-button admin-product-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando producto...' : 'Crear producto'}
        </button>
      </form>
    </main>
  )
}
