const express = require('express');
const productos = require('../data/productos').listaProductos;

const productosRouter = express.Router();

productosRouter.get('/', (req, res) => {
    res.json(productos);
});

productosRouter.get('/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));

    if (producto) {
        res.json(producto);
    } else {
        return next(createError(404, 'Producto no encontrado'));  
    }
});

module.exports = { productosRouter };
