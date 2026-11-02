const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');
const productosIniciales = require('../data/productosLista');

let productosMemoria = productosIniciales.map((producto) => ({ ...producto }));

function mongoListo() {
  return mongoose.connection.readyState === 1;
}

function productoPublico(producto) {
  if (!producto) return producto;
  const data = typeof producto.toJSON === 'function' ? producto.toJSON() : { ...producto };
  const id = data.id ?? data._id;
  const imagenUrl = data.imagenUrl || data.imagen || '';

  return {
    ...data,
    id,
    _id: data._id ?? id,
    imagenUrl,
    imagen: data.imagen || imagenUrl,
  };
}

function camposProducto(body = {}) {
  const datos = {};

  if (body.nombre !== undefined) datos.nombre = String(body.nombre).trim();
  if (body.descripcion !== undefined) datos.descripcion = String(body.descripcion);
  if (body.categoria !== undefined) datos.categoria = String(body.categoria).trim();
  if (body.precio !== undefined) datos.precio = Number(body.precio);
  if (body.stock !== undefined) datos.stock = Number(body.stock);

  if (body.imagenUrl !== undefined || body.imagen !== undefined) {
    const imagen = body.imagenUrl || body.imagen || '';
    datos.imagenUrl = imagen;
    datos.imagen = imagen;
  }

  return datos;
}

function indiceEnMemoria(id) {
  const clave = String(id);
  return productosMemoria.findIndex(
    (producto) => String(producto.id) === clave || String(producto._id) === clave
  );
}

router.get('/', async (req, res) => {
  try {
    if (mongoListo()) {
      const productos = await Product.find();
      return res.json(productos.map(productoPublico));
    }

    res.json(productosMemoria.map(productoPublico));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (mongoListo()) {
      const producto = await Product.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      return res.json(productoPublico(producto));
    }

    const indice = indiceEnMemoria(req.params.id);
    if (indice === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoPublico(productosMemoria[indice]));
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});

router.post('/', async (req, res) => {
  try {
    const datos = camposProducto(req.body);

    if (!datos.nombre || !Number.isFinite(datos.precio)) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios.' });
    }

    if (mongoListo()) {
      const productoGuardado = await Product.create(datos);
      return res.status(201).json(productoPublico(productoGuardado));
    }

    const ids = productosMemoria
      .map((producto) => Number(producto.id))
      .filter(Number.isFinite);
    const id = (ids.length ? Math.max(...ids) : 0) + 1;
    const nuevoProducto = { id, stock: 0, ...datos };

    productosMemoria.push(nuevoProducto);
    res.status(201).json(productoPublico(nuevoProducto));
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto. Verifica los campos requeridos.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const datos = camposProducto(req.body);

    if (mongoListo()) {
      const productoActualizado = await Product.findByIdAndUpdate(
        req.params.id,
        datos,
        { new: true, runValidators: true }
      );

      if (!productoActualizado) {
        return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
      }

      return res.json(productoPublico(productoActualizado));
    }

    const indice = indiceEnMemoria(req.params.id);
    if (indice === -1) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
    }

    productosMemoria[indice] = {
      ...productosMemoria[indice],
      ...datos,
    };

    res.json(productoPublico(productosMemoria[indice]));
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (mongoListo()) {
      const productoEliminado = await Product.findByIdAndDelete(req.params.id);
      if (!productoEliminado) {
        return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
      }
      return res.json({ mensaje: 'Producto eliminado correctamente' });
    }

    const indice = indiceEnMemoria(req.params.id);
    if (indice === -1) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }

    productosMemoria.splice(indice, 1);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;
