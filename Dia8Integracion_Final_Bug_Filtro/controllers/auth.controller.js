const AuthService = require('../services/authService');

const authService = new AuthService();

exports.register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.status(201).json({ message: 'Administrador Registrado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Faltan campos' });
        }
        const { token } = await authService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}


