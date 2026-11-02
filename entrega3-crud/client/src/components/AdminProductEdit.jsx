import React, { useState, useEffect } from 'react';
import './adminProductEdit.css';
import { PRODUCTS_API_URL } from '../utils/api';

const AdminProductEdit = () => {
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(PRODUCTS_API_URL);
        if (!response.ok) throw new Error('Error al obtener productos');
        const data = await response.json();
        
        // Manejar respuestas que vienen dentro de una propiedad (ej. data.productos)
        const listaProductos = Array.isArray(data) ? data : (data.productos || data.data || []);
        setProductos(listaProductos);
      } catch (error) {
        setFeedback({
          message: 'No se pudieron cargar los productos.',
          type: 'error'
        });
      } finally {
        setFetching(false);
      }
    };

    fetchProductos();
  }, []);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setFeedback({ message: '', type: '' });

    if (!id) {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: ''
      });
      return;
    }

    // Buscar coincidencia verificando tanto _id como id
    const productoEncontrado = productos.find(
      (p) => String(p._id || p.id) === String(id)
    );

    

    if (productoEncontrado) {
      setFormData({
        nombre: productoEncontrado.nombre || productoEncontrado.title || '',
        descripcion: productoEncontrado.descripcion || productoEncontrado.description || '',
        precio: productoEncontrado.precio ?? productoEncontrado.price ?? '',
        stock: productoEncontrado.stock ?? 0,
        imagenUrl: productoEncontrado.imagenUrl || productoEncontrado.imagen || productoEncontrado.image || ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    setLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      const response = await fetch(`${PRODUCTS_API_URL}/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio),
          stock: Number(formData.stock)
        })
      });

      if (!response.ok) {
        let detalle = 'Error al actualizar el producto';
        try {
          const result = await response.json();
          detalle = result?.error || detalle;
        } catch {
          // Se usa el mensaje genérico si la respuesta no es JSON.
        }
        throw new Error(detalle);
      }

      const productoActualizado = await response.json();

      setProductos((prev) =>
        prev.map((p) => (String(p._id || p.id) === String(selectedId) ? productoActualizado : p))
      );

      setFeedback({
        message: '¡Producto actualizado con éxito!',
        type: 'success'
      });
    } catch (error) {
      setFeedback({
        message: error instanceof Error
          ? error.message
          : 'Ocurrió un error al intentar actualizar el producto.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-edit-container">
      <div className="admin-product-field admin-product-field-wide">
        <label htmlFor="select-product">Seleccionar producto a editar</label>
        <select
          id="select-product"
          value={selectedId}
          onChange={handleSelectChange}
          disabled={fetching}
        >
          <option value="">-- Elige un producto --</option>
          {productos.map((prod, index) => {
            const prodId = prod._id || prod.id;
            return (
              <option key={prodId || `prod-${index}`} value={prodId}>
                {prod.nombre || prod.title} (${prod.precio ?? prod.price})
              </option>
            );
          })}
        </select>
      </div>

      {selectedId && (
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <div className="admin-product-fields">
            <div className="admin-product-field">
              <label htmlFor="nombre">Nombre del Producto</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-product-field">
              <label htmlFor="precio">Precio ($)</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-product-field admin-product-field-wide">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="admin-product-field admin-product-field-wide">
              <label htmlFor="imagenUrl">URL de la Imagen</label>
              <input
                type="text"
                id="imagenUrl"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleChange}
              />
            </div>

            <div className="admin-product-field admin-product-field-wide">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          {feedback.message && (
            <div
              className={`admin-product-feedback admin-product-feedback-${feedback.type}`}
            >
              {feedback.message}
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-edit-submit admin-product-submit"
            disabled={loading}
          >
            {loading ? 'Guardando cambios...' : 'Guardar Cambios'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminProductEdit;