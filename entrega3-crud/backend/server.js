require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loggerMiddleware = require('./middleware/logger');
const { router: productosRouter } = require('./routes/productos');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/productos', productosRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('¡Conexión exitosa!'))
    .catch((error) => console.error('Error al conectar:', error));
} else {
  console.error('Sin MONGO_URI: las rutas de productos devolverán HTTP 503.');
}

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;
