const mongoose = require('mongoose');

const usuarioSchem = new mongoose.Schema({
    
  nombre: {
    type: String,
    requierd: true,
    trim: true
  },
  email: {
    type: String,
    requierd: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    requierd: true,
  }
 }, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchem);