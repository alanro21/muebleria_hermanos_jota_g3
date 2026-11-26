const express = require('express');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/privada', verificarToken, (req, res) => {
  res.status(200).json({
    mensaje: 'Acceso autorizado',
    usuario: req.usuario
  });
});

module.exports = { router };