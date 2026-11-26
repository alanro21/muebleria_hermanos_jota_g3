const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0
    }
  }],

  total: {
    type: Number,
    required: true,
    min: 0
  },

  estado: {
    type: String,
    default: 'pendiente'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema);