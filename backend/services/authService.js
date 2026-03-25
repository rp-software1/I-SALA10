const AuthUser = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../config')

class AuthService {
    constructor() { }

    async register(data) {
        const { email, password } = data;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const usuario = new AuthUser({ email, password: hashedPassword });
        return await usuario.save();
    }

    async login(data) {
        const { email, password } = data;
        const usuario = await AuthUser.findOne({ email });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            throw new Error('Contraseña incorrecta');
        }
        const payload = ({ email: usuario.email });
        const token = await this.generateToken(payload);
        return { usuario, token };


    }

    async generateToken(payload) {
        const claveSecreta = process.env.JWT_SECRET || 'clave_desarrollo';
        return jwt.sign(payload, claveSecreta, { expiresIn: '1h' });
    }

}

module.exports = AuthService;
