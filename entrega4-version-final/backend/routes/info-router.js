const express = require('express');

const infoRouter = express.Router();

infoRouter.get('/', (req, res) => {
    res.send('Bienvenido a la API de Mueblería Jota');
});

infoRouter.get('/info', (req, res) => {
    res.send(`
         <h2>Información de la rutas API Muebleria Jota: </h2>
         <ul>
            <li>GET /: Bienvenida</li>
            <li>GET /api/productos: Listado de productos</li>
         </ul>
        `)
})


module.exports = { infoRouter };