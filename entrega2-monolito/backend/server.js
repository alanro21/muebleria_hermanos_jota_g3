require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const loggerMiddleware = require('./middleware/logger');
const productosRouter = require('./routes/productos');

const app = express();

//middlewares
app.use(loggerMiddleware);
app.use(express.json());

//rutas
app.use('/api/productos', productosRouter);

//mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('¡Conexión exitosa!'))
  .catch((error) => console.error('Error al conectar', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});