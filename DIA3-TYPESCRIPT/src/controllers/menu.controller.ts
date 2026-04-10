import { Request, Response } from "express";
import { platoService } from "../services/plato.service";
import { CreatePlatoDto, UpdatePlatoDto } from "../types/restaurante.types";

// GET /menu — lista todos los platos
export const obtenerMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const platos = await platoService.buscarTodos();
        res.status(200).json(platos);
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ error: 'Error al obtener el Menu' });
    }
}

// GET /menu/:id — un plato específico
export const obtenerPlato = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const plato = await platoService.buscarPorId(req.params.id);
        if (!plato) {
            res.status(404).json({ error: 'Plato no encontrado' });
            return;
        }
        res.status(200).json(plato);
    } catch (error: unknown) {

        if (error instanceof Error && error.message === 'Plato no encontrado') {
            res.status(404).json({ error: error.message });
            return;
        }

        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ error: 'Error al buscar el Plato' });
    }
}

// POST /menu — crear plato (protegido con JWT)
export const crearPlato = async (req: Request<{}, {}, CreatePlatoDto>, res: Response): Promise<void> => {
    try {
        const plato = await platoService.crear(req.body);
        res.status(201).json(plato);
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno';
        res.status(500).json({ error: 'Error al crear Plato' });
    }
}

// PUT /menu/:id — actualizar plato (protegido con JWT)
export const actualizarPlato = async (req: Request<{ id: string }, {}, UpdatePlatoDto>,
    res: Response): Promise<void> => {
    try {
        const plato = await platoService.actualizar(req.params.id, req.body);
        if (!plato) {
            res.status(404).json({ error: 'Plato no encontrado' });
            return;
        }
        res.status(200).json(plato);
    } catch (error: unknown) {

        if (error instanceof Error && error.message === 'Error al actualizar Plato') {
            res.status(404).json({ error: error.message });
            return;
        }

        const mensaje = error instanceof Error ? error.message : 'Error interno';
        res.status(500).json({ error: mensaje });
    }
}

// DELETE /menu/:id — eliminar plato (protegido con JWT)
export const eliminarPlato = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const plato = await platoService.eliminar(req.params.id);
        if (!plato) {
            res.status(404).json({ error: 'Plato no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Plato eliminado', plato });
    } catch (error: unknown) {

        if (error instanceof Error && error.message === 'Error al eliminar Plato') {
            res.status(404).json({ error: error.message });
            return;
        }

        const mensaje = error instanceof Error ? error.message : 'Error interno';
        res.status(500).json({ error: mensaje });
    }
}

// GET /menu/categoria/:cat — filtrar por categoría
export const filtrarPorCategoria = async (req: Request<{ cat: string }>, res: Response): Promise<void> => {
    try {
        const platos = await platoService.buscarPorCategoria(req.params.cat);
        res.status(200).json(platos);
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno';
        res.status(500).json({ error: 'Error al obtener al filtrar platos por categoria' });
    }
}



