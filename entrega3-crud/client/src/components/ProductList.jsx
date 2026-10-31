import { useState } from 'react';
import './ProductList.css';
import ProductCard from "./ProductCard";

function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

export default function ProductList({
  productos,
  loading,
  error,
  onAddToCart = () => {},
  onProductSelect,
}) {
  const [busqueda, setBusqueda] = useState('');

  if (loading) {
    return (
      <section className="catalogo" id="catalogo">
        <p>Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="productos-destacados" id="productos">
        <p>Error al cargar los productos: {error}</p>
      </section>
    );
  }

  const termino = normalizarTexto(busqueda.trim());
  const productosFiltrados = productos.filter((producto) =>
    [producto.nombre, producto.categoria]
      .some((dato) => normalizarTexto(dato).includes(termino))
  );

  return (
    <section className="catalogo" id="catalogo">
      <div className="catalogo-banner">
        <span className="catalogo-badge">Catálogo completo</span>
        <h2 className="catalogo-titulo">
          <span>NUESTROS</span>
          <span>MUEBLES</span>
        </h2>
        <p>
          Cada pieza se fabrica a pedido en nuestro taller de San Cristóbal,
          con maderas macizas y un oficio que aprendimos de quienes
          estuvieron antes y seguimos perfeccionando hoy.
        </p>
      </div>

      <div className="catalogo-toolbar">
        <label className="catalogo-busqueda" aria-label="Buscar producto">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscá por nombre o categoría, ej: mesa, sillón..."
          />
        </label>
        <span className="catalogo-resultado">
          Mostrando {productosFiltrados.length} de {productos.length} productos
        </span>
      </div>

      <div className="productos-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              {...producto}
              showAddToCart
              onAddToCart={() => onAddToCart?.(producto)}
              onProductClick={() => onProductSelect?.(producto)}
            />
          ))
        ) : (
          <p className="catalogo-sin-resultados" role="status">
            No encontramos productos que coincidan con “{busqueda}”.
          </p>
        )}
      </div>
    </section>
  );
}
