require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importación agrupada arriba con las demás
const loggerMiddleware = require('./middleware/logger');
const productosRouter = require('./routes/productos');

const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(loggerMiddleware);


app.use('/api/productos', productosRouter);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('¡Conexión exitosa!'))
  .catch((error) => console.error('Error al conectar:', error));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

