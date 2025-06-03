const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
    max: options.max || 100, // 100 requêtes par IP
    message: options.message || 'Trop de requêtes, veuillez réessayer plus tard.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      logger.warn(`Rate limit exceeded for IP ${req.ip}`);
      res.status(429).json({ error: options.message });
    },
  });
};

module.exports = createRateLimiter;
