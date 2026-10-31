const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

//producto específico
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});

//producto nuevo
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto. Verifica los campos requeridos.' });
  }
});

//actualizar producto existente
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
});

//elimina un producto
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = { router };