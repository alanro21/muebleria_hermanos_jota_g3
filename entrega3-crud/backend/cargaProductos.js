
require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/Product');
const productos = require('./data/productosLista');

async function cargarProductos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Conectado a MongoDB');

    const operaciones = productos.map((producto) => ({
      updateOne: {
        filter: { nombre: producto.nombre },
        update: {
          $set: {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagenUrl: producto.imagen,
            stock: 0
          }
        },
        upsert: true
      }
    }));

    const resultado = await Product.bulkWrite(operaciones);

    console.log('Carga finalizada');
    console.log('Productos insertados:', resultado.upsertedCount);
    console.log('Productos actualizados:', resultado.modifiedCount);

  } catch (error) {
    console.error('Error al cargar productos:', error);
  } finally {
    await mongoose.disconnect();
  }
}

cargarProductos();
