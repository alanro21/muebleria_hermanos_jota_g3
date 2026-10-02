const express = require('express');
const router = express.Router();

//Importamos los datos (productos.js)
const productos = require('../data/productosLista'); 

router.get('/', (req, res) => {
  res.json(productos);
});

//Da el producto o error 404
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const productoEncontrado = productos.find(p => String(p.id) === id);

  if (!productoEncontrado) {
    return res.status(404).json({ 
      error: 'Producto no encontrado'
    });
  }

  res.json(productoEncontrado);
});

module.exports = { router };