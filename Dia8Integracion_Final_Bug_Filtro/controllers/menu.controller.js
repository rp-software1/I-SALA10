// controllers/menu.controller.
const PlatoService = require('../services/platoService');

const platoService = new PlatoService();

// Estas funciones son los equivalentes de operaciones.js del Sprint 0

// Los datos viven aqui por ahora - en el Dia 4 pasaran a una base de datos 
let menu = [
    { id: 1, nombre: 'Lomo Saltado', precio: 18, categoria: 'segundos', stock: 3, disponible: true },
    { id: 2, nombre: 'Arroz con Pollo', precio: 12, categoria: 'segundos', stock: 5, disponible: true },
    { id: 3, nombre: 'Sopa', precio: 8, categoria: 'entradas', stock: 10, disponible: true },
];

// Equivalente a mostrarMenu() del Sprint 0
exports.obtenerMenu = async (req, res) => {
    try {
        const platos = await platoService.obtenerTodos();
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

};

// Equivalente a buscarPlatopPorNombre() del Sprint 0
exports.buscarPlato = async (req, res) => {
    const { nombre } = req.query;
    if (!nombre) {
        return res.status(400).json({ error: `Parametro nombre requerido` });
    }

    try {
        const plato = await platoService.buscarPorNombre(nombre);
        if (plato.length === 0) {
            return res.status(404).json({ error: `Plato '${nombre}' no encontrado` });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

exports.buscarPorCategoria = async (req, res) => {
    const { categoria } = req.query;
    if (!categoria) {
        return res.status(400).json({ error: `Parametro categoria requerido` });
    }

    try {
        const plato = await platoService.buscarPorCategoria(categoria);
        if (plato.length === 0) {
            return res.status(404).json({ error: `Plato '${categoria}' no encontrado` });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const plato = await platoService.buscarPorId(id);
        if (!plato) {
            return res.status(404).json({ error: `Plato  no encontrado` });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Equivalente a agregarPlato()  del Sprint 0
exports.agregarPlato = async (req, res) => {

    try {
        const { nombre, precio, stock, categoria } = req.body;
        const nuevo = await platoService.crear({ nombre, precio, stock, categoria });
        res.status(201).json({ mensaje: 'Plato creado', plato: nuevo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar plato por ID
exports.eliminarPlato = async (req, res) => {

    try {
        const { id } = req.params;
        const eliminado = await platoService.eliminar(id);
        if (!eliminado) {
            return res.status(404).json({ error: `Plato  no encontrado` });
        }
        res.status(200).json({ mensaje: 'Plato eliminado', plato: eliminado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar stock de un plato -equvalente a actualizarStock() del Sprint 0
exports.actualizarPlato = async (req, res) => {

    try {
        const { id } = req.params;
        const { precio, stock } = req.body;
        const actualizado = await platoService.actualizar(id, { precio, stock });
        if (!actualizado) {
            return res.status(404).json({ error: `Plato  no encontrado` });
        }
        res.status(200).json({ mensaje: 'Plato actualizado', plato: actualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}