// routes/menu.routes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const menuController = require('../controllers/menu.controller');
const logger = require('../middlewares/logger');
const verifyToken = require('../middlewares/verifyToken');
const verificarDatosPlato = (req, res, next) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({
            error: 'Middleware: nombre y precio son obligatorios'
        });
    }
    if (precio <= 0) {
        return res.status(400).json({
            error: 'Middleware: el precio debe ser mayor a cero'
        });
    }
    next(); // datos validos -> continua al controlador
};

const verificarId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Middleware: ID no válido para MongoDB'
        });
    }
    next();
};



const verificarNombre = (req, res, next) => {
    const { nombre } = req.query;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            error: 'Middleware: el nombre es obligatorio'
        });
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(nombre)) {
        return res.status(400).json({
            error: 'Middleware: el nombre solo acepta letras'
        });
    }
    next();
};

//  GET /menu
router.get('/', menuController.obtenerMenu);

//GET/menu/buscar?nombre=xxx
router.get('/buscar', logger, verificarNombre, menuController.buscarPlato);

//GET/menu/:id
router.get('/:id', menuController.buscarPorId);

//POST/menu
router.post('/', verifyToken, logger, verificarDatosPlato, menuController.agregarPlato);

//DELETE/menu/:id
router.delete('/:id', verifyToken, logger, verificarId, menuController.eliminarPlato);

// PUT /menu/:id
router.put('/:id', verifyToken, verificarId, menuController.actualizarPlato);


// Agregar  en routes/menu.routes.js antes de module.exports

module.exports = router;