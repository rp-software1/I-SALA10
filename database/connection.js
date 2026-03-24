const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // ✅ Lee process.env directamente aquí, no arriba
        const mongoUri = process.env.MONGO_URI;
        await mongoose.connect(mongoUri);
        console.log('MongoDB conectado - restaurante');
    } catch (error) {
        console.error('Error de conexion:', error.message);
    }
}

module.exports = conectarDB;