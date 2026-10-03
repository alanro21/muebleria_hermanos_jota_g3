import './productCard.css'

import aparador from '../assets/Aparador Uspallata.png'
import biblioteca from '../assets/Biblioteca Recoleta.png'
import butaca from '../assets/Butaca Mendoza.png'
import sillon from '../assets/Sillón Copacabana.png'
import escritorio from '../assets/Escritorio Costa.png'
import mesa from '../assets/Mesa Comedor Pampa.png'
import mesaCentro from '../assets/Mesa de Centro Araucaria.png'
import mesaNoche from '../assets/Mesa de Noche Aconcagua.png'
import sillaTrabajo from '../assets/Silla de Trabajo Belgrano.png'
import sillaCordoba from '../assets/Sillas Córdoba.png'
import sofaPata from '../assets/Sofá Patagonia.png'



const imagenesProductos = {
  'Aparador Uspallata': aparador,
  'Biblioteca Recoleta': biblioteca,
  'Butaca Mendoza': butaca,
  'Sillón Copacabana': sillon,
  'Escritorio Costa': escritorio,
  'Mesa Comedor Pampa': mesa,
  'Mesa de Centro Araucaria': mesaCentro,
  'Mesa de Noche Aconcagua': mesaNoche,
  'Silla de Trabajo Belgrano': sillaTrabajo,
  'Sillas Córdoba': sillaCordoba,
  'Sofá Patagonia': sofaPata,
}

export function getProductImage(nombre) {
  return imagenesProductos[nombre]
}

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
