import ProductCard from './ProductCard'

export default function FeaturedProducts({
  productos,
  onNavigate,
  onProductSelect,
  loading,
  error,
}) {


  return (
    <section
      className="productos-destacados"
      id="productos"
      aria-labelledby="productos-title"
    >

      <div className="productos-heading">

        <div>
          <span
            className="productos-acento"
            aria-hidden="true"
          />

          <h2 id="productos-title">
            Productos destacados
          </h2>
        </div>

        <a
          href="#catalogo"
          className="productos-catalogo-link"
          onClick={(event) => {
            event.preventDefault()
            onNavigate?.('productos')
          }}
        >
          Ver catálogo completo
        </a>

      </div>

      <div className="productos-grid">
        {loading && <p role="status">Cargando productos...</p>}
        {error && <p role="alert">No pudimos cargar los productos. Verificá que el servidor esté funcionando e intentá recargar la página.</p>}

        {productos.slice(0,4).map((producto) => (
          <ProductCard
            key={producto.id}
            {...producto}
            onProductClick={() => onProductSelect?.(producto)}
          />
        ))}

      </div>

    </section>
  )
}
