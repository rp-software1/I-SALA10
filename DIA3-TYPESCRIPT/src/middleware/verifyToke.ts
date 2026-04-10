import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AuthRequest, esRestaurantePayload } from "../types/restaurante.types";
import { config } from "../config";


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {

    // Extraer el token del header Authorization: Bearer <token>
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(401).json({ error: 'Autoherizacion header requerido' })
        return
    }

    const token = authHeader.split(' ')[1] as string
    try {
        const decoded = verify(token, config.jwtSecret)
        if (!esRestaurantePayload(decoded)) {
            res.status(401).json({ error: 'Payload del token invalido' })
            return
        }
        req.user = decoded // decoded es RestaurantePayload
        next()

    } catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Token inválido o expirado'
        res.status(401).json({ error: mensaje })
    }

}