//app.js - solo configuracion y conexion
require('dotenv').config();
const { port } = require('./config')
const express = require('express');
const menuRouter = require('./routes/menu.routes');
const authRouter = require('./routes/auth.route');

const app = express();
const PORT = 3000;

const logger = require('./middlewares/logger');
// Conectar a la base de datos
const conectarDB = require('./database/connection');

app.use(express.json());
app.use(logger); // SE EJECUTA EN TODAS LAS PETICIONES


// Conectar el router del menu
app.use('/menu', menuRouter);
app.use('/auth', authRouter);




// Ruta de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido al restaurante',
        version: '2.0.0',
        ruta: ['/menu']
    });
});

conectarDB();
app.listen(port, () => {
    console.log(`Restaurante coriendo en htpp://localhost:${port}`);
});