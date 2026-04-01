const Plato = require('../models/platoModel');

class PlatoService {

    constructor() { }

    async crear(data) {
        const plato = new Plato(data);
        return await plato.save();
    }

    async obtenerTodos() {
        return await Plato.find({});
    }

    async buscarPorNombre(nombre) {
        return await Plato.find({ nombre: { $regex: nombre, $options: 'i' } });
    }
    async buscarPorCategoria(categoria) {
        return await Plato.find({ categoria: { $regex: categoria, $options: 'i' } });
    }

    async buscarPorId(id) {
        return await Plato.findById({ _id: id });
    }

    async actualizar(id, data) {
        return await Plato.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminar(id) {
        return await Plato.findByIdAndDelete(id);
    }
}

module.exports = PlatoService;
