const loggerMiddleware = (req, res, next) => {
  console.log(`[LOG] Método: ${req.method} | URL: ${req.originalUrl}`);
  next();
};

module.exports = loggerMiddleware;