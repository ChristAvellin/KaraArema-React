const logger = require('../config/logger');

const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
};

module.exports = errorMiddleware;