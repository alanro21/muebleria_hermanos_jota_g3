const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imagenUrl: { type: String }
}, { 
  timestamps: true
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = String(ret._id);
    if (ret.imagenUrl && !ret.imagen) {
      ret.imagen = ret.imagenUrl;
    }
    return ret;
  },
});

module.exports = mongoose.model('Product', productSchema);