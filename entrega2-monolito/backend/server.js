// Esto es para levantar el servidor de Express.
const express = require('express');

// Express: guarda require('express') para levantar el servidor.
const app = express();

// CORS: permite recibir peticiones desde otros dominios/orígenes.
const cors = require('cors');

const PORT = 3000;
const logger = require('./middleware/logger');

// Registrar también peticiones con JSON inválido y preflight CORS.
app.use(logger);

// Middleware CORS
app.use(cors());

// Middleware para recibir JSON
app.use(express.json());

app.set('json spaces', 2); // Para que el JSON se vea bonito en la respuesta

// Middleware global de logging

// Importamos los routers
const { infoRouter } = require('./routes/info-router');
const { router } = require('./routes/productos');

// Rutas
app.use('/', infoRouter);
app.use('/api/productos', router);

// Manejador de rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) return next(err);
    const status = err.status >= 400 && err.status < 600 ? err.status : 500;
    res.status(status).json({
        error: err.type === 'entity.parse.failed' ? 'JSON inválido' : 'Error interno del servidor'
    });
});

// Levantar servidor
if (require.main === module) app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
});

module.exports = app;
