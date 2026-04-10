import { Plato, CreatePlatoDto } from "../types/restaurante.types"

//Import el modelo de Mongoose
const PlatoModel = require("../../models/platoModel")

export class PlatoService {

    // Devuelve todos los platos — array vacío si no hay ninguno
    async buscarTodos(): Promise<Plato[]> {
        return await PlatoModel.find();
    }

    // Devuelve un plato por id — null si no existe
    async buscarPorId(id: string): Promise<Plato | null> {
        return await PlatoModel.findById(id);
    }

    // Crea un plato — recibe solo los campos que envía el cliente
    async crear(data: CreatePlatoDto): Promise<Plato> {
        const plato = new PlatoModel(data);
        return await plato.save();
    }

    //Actualiza — devuelve el documento NUEVO (new: true)
    async actualizar(id: string, data: Partial<CreatePlatoDto>): Promise<Plato | null> {
        return await PlatoModel.findByIdAndUpdate(id, data, { new: true });
    }
    // Elimina — devuelve el plato eliminado
    async eliminar(id: string): Promise<Plato | null> {
        return await PlatoModel.findByIdAndDelete(id);
    }

    // Filtrar por categoría — del Día 8 de Node.js
    async buscarPorCategoria(categoria: string): Promise<Plato[]> {
        return await PlatoModel.find({ categoria });
    }

}

export const platoService = new PlatoService();

