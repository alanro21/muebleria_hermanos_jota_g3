const express = require('express');
const mongoose = require('mongoose');

const Pedido = require('../models/Pedido');
const Product = require('../models/Product');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verificarToken, async (req, res) => {
  try {
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        error: 'El pedido debe contener productos'
      });
    }

    let total = 0;
    const productosPedido = [];

    for (const item of productos) {
      const { producto, cantidad } = item;

      if (!mongoose.Types.ObjectId.isValid(producto)) {
        return res.status(400).json({
          error: 'ID de producto inválido'
        });
      }

      if (!Number.isInteger(cantidad) || cantidad < 1) {
        return res.status(400).json({
          error: 'La cantidad debe ser un entero mayor a cero'
        });
      }

      const productoEncontrado = await Product.findById(producto);

      if (!productoEncontrado) {
        return res.status(404).json({
          error: 'Producto no encontrado'
        });
      }

      if (cantidad > productoEncontrado.stock) {
        return res.status(400).json({
          error: `Stock insuficiente para ${productoEncontrado.nombre}`
        });
      }

      const subtotal = productoEncontrado.precio * cantidad;

      total += subtotal;

      productosPedido.push({
        producto: productoEncontrado._id,
        cantidad,
        precioUnitario: productoEncontrado.precio
      });
    }

    const nuevoPedido = new Pedido({
      usuario: req.usuario.id,
      productos: productosPedido,
      total
    });

    await nuevoPedido.save();

    return res.status(201).json({
      mensaje: 'Pedido creado correctamente',
      pedido: nuevoPedido
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Error al crear el pedido'
    });
  }
});

router.get('/mis-pedidos', verificarToken, async (req, res) => {
  try {
    const pedidos = await Pedido.find({
      usuario: req.usuario.id
    }).populate('productos.producto');

    return res.status(200).json({
      mensaje: 'Pedidos obtenidos correctamente',
      cantidad: pedidos.length,
      pedidos
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Error al obtener los pedidos'
    });
  }
});

module.exports = { router };