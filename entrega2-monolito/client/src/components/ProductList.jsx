import ProductCard from "./ProductCard";

export default function ProductList({ productos, loading, error }) {
  if (loading) {
    return(
        <section className="productos-destacados" id="productos">
            <p>Cargando productos...</p>
        </section>
    ) 
  }

  if (error) {
    return (
        <section className="productos-destacados" id="productos">
            <p>Error al cargar los productos: {error}</p>
        </section>
    ) 
  }

  return (
    <section className="catalogo" id="catalogo">
    <div className="productos-heading"> 
    </div>
    <h2>Catalogo</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <ProductCard key={producto.nombre} {...producto} />
        ))}
      </div>
    </section>
  );
}
