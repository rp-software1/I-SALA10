const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const autoheader = req.headers['authorization'];
        if (!autoheader) {
            return res.status(401).json({ message: 'Token no enviado' });
        }
        const token = autoheader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_desarrollo');
        req.usuario = decoded;
        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = verifyToken;