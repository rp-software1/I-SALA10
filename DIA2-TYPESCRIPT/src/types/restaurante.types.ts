//ENUMS - Valores  fijos del restaurante
//Un enum garantiza solo los valores definidos aqui
//pueden usarse como categoria

export enum Categoria {
    ENTRADA = 'Entradas',
    PRINCIPAL = 'Segundos',
    POSTRE = 'Postres',
    BEBIDA = 'Bebidas'
}

// ----------------------------------------------
// INTERFACES - Modelos  del Restaurante
//-----------------------------------------------

export interface Plato {
    _id: string // generado por MongoDB
    nombre: string
    categoria: Categoria
    precio: number
    stock: number
    disponible: boolean
}


// ----------------------------------------------
// INTERFACES - DE LAS FUNCIONES DE LOS PLATOS  
//-----------------------------------------------

// Lo que envia el cliente al crea un plato  (POST/menu)
export interface CreatePlatoDto {
    nombre: string
    categoria: Categoria
    precio: number
    stock: number
    // Sin _id porque lo genera MongoDB
}

// Lo que devuelve el servidor al cliente  (GET/menu)
export interface PlatoResponseDto extends Plato {
    _id: string
    nombre: string
    categoria: Categoria
    precio: number
    stock: number
    disponible: boolean
}

export interface UpdatePlatoDto {
    nombre?: string
    categoria?: Categoria
    precio?: number
    stock?: number
}


// ----------------------------------------------
// INTERFACES - MODELO DE AUTENTICACION
//-----------------------------------------------
export interface User {
    _id: string
    email: string
    password: string // Siempre hasheado nunca en texto plano
}

export interface RegisterDto {
    email: string
    password: string
}

export interface LoginDto {
    email: string
    password: string
}

export interface LoginResponseDto {
    token: string
    message: string
}

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// ─────────────────────────────────────────────────────────
// INTERFACES — Autenticación y middleware
// ─────────────────────────────────────────────────────────
// Extendemos Request para incluir el payload del token
export interface AuthRequest extends Request {
    user?: JwtPayload | string
}


