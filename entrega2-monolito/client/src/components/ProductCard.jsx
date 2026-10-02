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
  1: aparador,
  2: biblioteca,
  3: butaca,
  4: sillon,
  5: escritorio,
  6: mesa,
  7: mesaCentro,
  8: mesaNoche,
  9: sillaTrabajo,
  10: sillaCordoba,
  11: sofaPata
}

export default function ProductCard({ id, nombre, categoria, precio}) {
  const imagen = imagenesProductos[id]
  return (
    <article className="product-card">
      <div className="product-card-image">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="product-card-details">
        <span className="product-card-category">{categoria}</span>
        <h3 className="product-card-name">{nombre}</h3>
        <p className="product-card-price">${precio}</p>
      </div>
    </article>
  )
}
