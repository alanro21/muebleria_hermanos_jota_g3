const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imagenUrl: { type: String }
}, { 
  timestamps: true //agrega la fecha de creación y actualización automáticamente
});

module.exports = mongoose.model('Product', productSchema);