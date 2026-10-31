import './productCard.css'

import { getProductImage } from '../utils/productImages'

export default function ProductCard({
  nombre,
  categoria,
  precio,
  showAddToCart = false,
  onAddToCart,
  onProductClick,
}) {
  const imagen = getProductImage(nombre)
  const nombreMostrar = nombre
    .toLocaleLowerCase('es')
    .replace(/^./u, (letra) => letra.toLocaleUpperCase('es'))

  return (
    <article className="product-card">
      {onProductClick ? (
        <button
          className="product-card-detail-trigger"
          type="button"
          onClick={onProductClick}
          aria-label={`Ver detalle de ${nombre}`}
        >
          <div className="product-card-image">
            <img src={imagen} alt="" />
          </div>
          <div className="product-card-details">
            <span className="product-card-category">{categoria}</span>
            <h3 className="product-card-name">{nombreMostrar}</h3>
            <p className="product-card-price">${precio}</p>
          </div>
        </button>
      ) : (
        <>
          <div className="product-card-image">
            <img src={imagen} alt={nombre} />
          </div>
          <div className="product-card-details">
            <span className="product-card-category">{categoria}</span>
            <h3 className="product-card-name">{nombreMostrar}</h3>
            <p className="product-card-price">${precio}</p>
          </div>
        </>
      )}
      {showAddToCart && (
        <button
          className="product-card-add-to-cart"
          type="button"
          onClick={onAddToCart}
        >
          Agregar a carrito
        </button>
      )}
    </article>
  )
}
