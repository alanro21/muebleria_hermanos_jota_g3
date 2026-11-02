import React, { useState } from 'react';
import AdminProductForm from './AdminProductForm';
import './Admin.css';
import AdminProductEdit from './AdminProductEdit';
// import AdminProductDelete from './AdminProductDelete';

const Admin = () => {
  const [modo, setModo] = useState('crear');

  return (
    <main className="admin-main">
      <header className="admin-product-heading">
        <span className="admin-product-eyebrow">Administración del catálogo</span>
        
        <nav className="admin-nav-actions">
          <button 
            type="button" 
            className={`admin-btn ${modo === 'crear' ? 'active' : ''}`}
            onClick={() => setModo('crear')}
          >
            Crear producto
          </button>

          <button 
            type="button" 
            className={`admin-btn ${modo === 'editar' ? 'active' : ''}`}
            onClick={() => setModo('editar')}
          >
            Editar producto
          </button>

       
        </nav>
      </header>

      <section className="admin-content-section">
        {modo === 'crear' && <AdminProductForm />}
        {modo === 'editar' && <AdminProductEdit />}
        {modo === 'eliminar' && <div>Componente/Lista para Eliminar</div>}
        {!modo && <p>Selecciona una opción para comenzar.</p>}
      </section>
    </main>
  );
};

export default Admin;