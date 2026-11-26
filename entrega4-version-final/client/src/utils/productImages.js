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

