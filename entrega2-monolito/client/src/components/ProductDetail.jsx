import { getProductImage } from './ProductCard'
import ProductCard from './ProductCard'
import './ProductDetail.css'

const etiquetasDetalles = {
  materiales: 'Materiales',
  medidas: 'Medidas',
  acabado: 'Acabado',
  tapizado: 'Tapizado',
  confort: 'Confort',
  peso: 'Peso',
  capacidad: 'Capacidad',
  modulares: 'Modularidad',
  rotacion: 'Rotación',
  garantia: 'Garantía',
  cargaMaxima: 'Carga máxima',
  almacenamiento: 'Almacenamiento',
  caracteristicas: 'Características',
  estructura: 'Estructura',
  relleno: 'Relleno',
  sostenibilidad: 'Sostenibilidad',
  extension: 'Extensión',
  apilables: 'Apilables',
  incluye: 'Incluye',
  cables: 'Detalles',
  regulacion: 'Regulación',
  certificacion: 'Certificación',
}

function obtenerEtiqueta(clave) {
  return etiquetasDetalles[clave] ??
    clave.replace(/([A-Z])/g, ' $1').replace(/^./, (letra) => letra.toUpperCase())
}

function formatearPrecio(precio) {
  return `$${new Intl.NumberFormat('es-AR').format(precio)}`
}

export default function ProductDetail({
  producto,
  productos,
  onNavigate,
  onProductSelect,
  onAddToCart = () => {},
  onBack,
}) {
  const imagen = getProductImage(producto.nombre)
  const productosRelacionados = productos
    .filter((item) => item.id !== producto.id)
    .sort((a, b) => {
      const aIsRelated = a.categoria === producto.categoria
      const bIsRelated = b.categoria === producto.categoria
      return Number(bIsRelated) - Number(aIsRelated)
    })
    .slice(0, 4)
  const detalles = Object.entries(producto).filter(
    ([clave, valor]) =>
      !['id', 'nombre', 'categoria', 'precio', 'imagen', 'descripcion'].includes(clave) &&
      valor !== null &&
      valor !== undefined &&
      valor !== ''
  )

  return (
    <section className="product-detail" aria-labelledby="product-detail-title">
      <nav className="product-detail-breadcrumb" aria-label="Ruta de navegación">
        <a href="#" onClick={(event) => { event.preventDefault(); onNavigate('inicio') }}>Inicio</a>
        <span aria-hidden="true">/</span>
        <a href="#" onClick={(event) => { event.preventDefault(); onBack() }}>Catálogo</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{producto.nombre}</span>
      </nav>

      <div className="product-detail-panel">
        <div className="product-detail-image">
          <img src={imagen} alt={producto.nombre} />
        </div>

        <div className="product-detail-content">
          <span className="product-detail-category">{producto.categoria}</span>
          <h1 id="product-detail-title">{producto.nombre}</h1>
          <p className="product-detail-price">{formatearPrecio(producto.precio)}</p>
          {producto.descripcion && (
            <p className="product-detail-description">{producto.descripcion}</p>
          )}

          {detalles.length > 0 && (
            <dl className="product-detail-specifications">
              {detalles.map(([clave, valor]) => (
                <div key={clave}>
                  <dt>{obtenerEtiqueta(clave)}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
          )}

          <button
            className="product-detail-add-to-cart"
            type="button"
            onClick={() => onAddToCart?.(producto)}
          >
            Agregar a carrito
          </button>

          <div className="product-detail-actions">
            <a
              className="product-detail-contact"
              href={`mailto:info@muebleriajota.com?subject=${encodeURIComponent(`Consulta por ${producto.nombre}`)}`}
            >
              Consultar disponibilidad
            </a>
            <button
              className="product-detail-back"
              type="button"
              onClick={onBack}
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <section
          className="product-detail-related"
          aria-labelledby="product-detail-related-title"
        >
          <h2 id="product-detail-related-title">También te puede interesar</h2>
          <div className="product-detail-related-grid">
            {productosRelacionados.map((productoRelacionado) => (
              <ProductCard
                key={productoRelacionado.id}
                {...productoRelacionado}
                onProductClick={() => onProductSelect(productoRelacionado)}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}