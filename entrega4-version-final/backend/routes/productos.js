const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

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

function camposProducto(body = {}, parcial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'El cuerpo de la solicitud debe ser un objeto.' };
  }

  const datos = {};

  if (body.nombre !== undefined) {
    if (typeof body.nombre !== 'string' || !body.nombre.trim()) {
      return { error: 'El nombre no puede estar vacío.' };
    }
    datos.nombre = body.nombre.trim();
  } else if (!parcial) {
    return { error: 'El nombre es obligatorio.' };
  }

  if (body.descripcion !== undefined) {
    if (typeof body.descripcion !== 'string') {
      return { error: 'La descripción debe ser texto.' };
    }
    datos.descripcion = body.descripcion;
  }

  if (body.precio !== undefined) {
    if (body.precio === '' || body.precio === null) {
      return { error: 'El precio debe ser un número igual o mayor a cero.' };
    }
    const precio = Number(body.precio);
    if (!Number.isFinite(precio) || precio < 0) {
      return { error: 'El precio debe ser un número igual o mayor a cero.' };
    }
    datos.precio = precio;
  } else if (!parcial) {
    return { error: 'El precio es obligatorio.' };
  }

  if (body.stock !== undefined) {
    if (body.stock === '' || body.stock === null) {
      return { error: 'El stock debe ser un entero igual o mayor a cero.' };
    }
    const stock = Number(body.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      return { error: 'El stock debe ser un entero igual o mayor a cero.' };
    }
    datos.stock = stock;
  }

  const imagen = body.imagenUrl !== undefined ? body.imagenUrl : body.imagen;
  if (imagen !== undefined) {
    if (typeof imagen !== 'string') {
      return { error: 'La URL de la imagen debe ser texto.' };
    }
    datos.imagenUrl = imagen.trim();
  }

  if (parcial && Object.keys(datos).length === 0) {
    return { error: 'Ingresá al menos un campo para actualizar.' };
  }

  return { datos };
}

function idValido(id) {
  return mongoose.isObjectIdOrHexString(id);
}

function errorServidor(res, operacion, error) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ error: 'Los datos del producto no son válidos.' });
  }

  console.error(`Error al ${operacion} producto:`, error);
  return res.status(500).json({ error: `Error al ${operacion} el producto.` });
}

router.get('/', async (req, res) => {
  if (!mongoListo()) {
    return res.status(503).json({ error: 'La base de datos no está disponible.' });
  }

  try {
    const productos = await Product.find();
    return res.json(productos.map(productoPublico));
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

router.get('/:id', async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'El identificador del producto no es válido.' });
  }
  if (!mongoListo()) {
    return res.status(503).json({ error: 'La base de datos no está disponible.' });
  }

  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    return res.json(productoPublico(producto));
  } catch (error) {
    return errorServidor(res, 'buscar', error);
  }
});

router.post('/', async (req, res) => {
  const { datos, error } = camposProducto(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  if (!mongoListo()) {
    return res.status(503).json({ error: 'La base de datos no está disponible.' });
  }

  try {
    const productoGuardado = await Product.create(datos);
    return res.status(201).json(productoPublico(productoGuardado));
  } catch (error) {
    return errorServidor(res, 'crear', error);
  }
});

router.put('/:id', async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'El identificador del producto no es válido.' });
  }

  const { datos, error } = camposProducto(req.body, true);
  if (error) {
    return res.status(400).json({ error });
  }
  if (!mongoListo()) {
    return res.status(503).json({ error: 'La base de datos no está disponible.' });
  }

  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar.' });
    }

    return res.json(productoPublico(productoActualizado));
  } catch (error) {
    return errorServidor(res, 'actualizar', error);
  }
});

router.delete('/:id', async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'El identificador del producto no es válido.' });
  }
  if (!mongoListo()) {
    return res.status(503).json({ error: 'La base de datos no está disponible.' });
  }

  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar.' });
    }
    return res.json({ mensaje: 'Producto eliminado correctamente.', id: req.params.id });
  } catch (error) {
    return errorServidor(res, 'eliminar', error);
  }
});

module.exports = { router };
