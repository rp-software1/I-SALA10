// middlewares/logger.js

const logger = (req, res, next) => {
    const ahora = new Date().toLocaleTimeString();
    console.log(`[${ahora}] ${req.method} ${req.url}`);
    next(); // next() la peticion se detiene aqui
};

module.exports = logger;