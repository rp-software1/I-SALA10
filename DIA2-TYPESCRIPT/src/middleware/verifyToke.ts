import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AuthRequest } from "../types/restaurante.types";

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {

    // Extraer el token del header Authorization: Bearer <token>
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(401).json({ error: 'Autoherizacion header requerido' })
        return
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({ error: 'Token no encontrado en el header' })
        return

    }

    try {
        const secret = process.env.JWT_SECRET
        if (!secret)
            throw new Error('JWT_SECRET no configurado')

        // verify() retorna JwtPayload | string
        req.user = verify(token, secret)
        next()

    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' })
    }

}