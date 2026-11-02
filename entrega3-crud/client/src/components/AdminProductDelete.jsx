import { useEffect, useState } from 'react'
import { PRODUCTS_API_URL } from '../utils/api'
import './AdminProductForm.css'

export default function AdminProductDelete() {
  const [productos, setProductos] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [fetching, setFetching] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarProductos() {
      try {
        const response = await fetch(PRODUCTS_API_URL, { signal: controller.signal })
        let data
        try {
          data = await response.json()
        } catch {
          throw new Error('El servidor devolvió una respuesta que no se pudo interpretar.')
        }

        if (!response.ok) {
          throw new Error(data?.error || `No se pudieron cargar los productos (HTTP ${response.status}).`)
        }

        const listaProductos = Array.isArray(data) ? data : (data.productos || data.data || [])
        if (!Array.isArray(listaProductos)) {
          throw new Error('El servidor devolvió un listado de productos inválido.')
        }
        setProductos(listaProductos)
      } catch (error) {
        if (error.name === 'AbortError') return
        setFeedback({
          type: 'error',
          message: error instanceof Error ? error.message : 'No se pudieron cargar los productos.',
        })
      } finally {
        if (!controller.signal.aborted) setFetching(false)
      }
    }

    cargarProductos()
    return () => controller.abort()
  }, [])

  async function handleDelete() {
    const producto = productos.find((item) => String(item._id ?? item.id) === selectedId)
    if (!producto || deleting) return

    const nombre = producto.nombre || producto.title || 'este producto'
    if (!window.confirm(`¿Seguro que querés eliminar “${nombre}”? Esta acción no se puede deshacer.`)) {
      return
    }

    setDeleting(true)
    setFeedback(null)

    try {
      const response = await fetch(`${PRODUCTS_API_URL}/${encodeURIComponent(selectedId)}`, {
        method: 'DELETE',
      })
      let result
      try {
        result = await response.json()
      } catch {
        throw new Error('El servidor devolvió una respuesta que no se pudo interpretar.')
      }

      if (!response.ok) {
        throw new Error(result?.error || `No se pudo eliminar el producto (HTTP ${response.status}).`)
      }

      setProductos((actuales) =>
        actuales.filter((item) => String(item._id ?? item.id) !== selectedId)
      )
      setSelectedId('')
      setFeedback({
        type: 'success',
        message: result?.mensaje || `El producto “${nombre}” se eliminó correctamente.`,
      })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al eliminar el producto.',
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main className="admin-product-page">
      <header className="admin-product-heading">
        <span className="admin-product-eyebrow">Administración del catálogo</span>
        <h1>Eliminar producto</h1>
        <p>Seleccioná el producto que querés quitar del catálogo.</p>
      </header>

      <section className="admin-product-form">
        <div className="admin-product-field">
          <label htmlFor="delete-product">Producto</label>
          <select
            id="delete-product"
            value={selectedId}
            onChange={(event) => {
              setSelectedId(event.target.value)
              setFeedback(null)
            }}
            disabled={fetching || deleting || productos.length === 0}
          >
            <option value="">
              {fetching ? 'Cargando productos...' : 'Seleccioná un producto'}
            </option>
            {productos.map((producto, index) => {
              const id = producto._id ?? producto.id
              return (
                <option key={id ?? `producto-${index}`} value={id}>
                  {producto.nombre || producto.title || 'Producto sin nombre'} — $
                  {producto.precio ?? producto.price ?? 0}
                </option>
              )
            })}
          </select>
        </div>

        {!fetching && productos.length === 0 && !feedback?.type.includes('error') && (
          <p className="admin-product-feedback" role="status">
            No hay productos disponibles para eliminar.
          </p>
        )}

        {feedback && (
          <p
            className={`admin-product-feedback admin-product-feedback-${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
          >
            {feedback.message}
          </p>
        )}

        <button
          className="jota-button admin-product-submit"
          type="button"
          onClick={handleDelete}
          disabled={!selectedId || fetching || deleting}
        >
          {deleting ? 'Eliminando producto...' : 'Eliminar producto'}
        </button>
      </section>
    </main>
  )
}
