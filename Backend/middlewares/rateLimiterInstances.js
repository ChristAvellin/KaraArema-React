// middlewares/rateLimiterInstances.js
const createRateLimiter = require('./rateLimiterMiddleware');

// Limiteur pour /api/auth/login (5 requêtes toutes les 15 minutes)
const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
});

// Limiteur pour /api/auth/register (10 requêtes toutes les 15 minutes)
const registerRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Trop de tentatives d\'inscription. Réessayez dans 15 minutes.',
});

// Limiteur pour /api/admin/refresh-config (5 requêtes par heure)
const refreshConfigLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Trop de requêtes. Réessayez dans une heure.',
});

module.exports = {
  loginRateLimiter,
  registerRateLimiter,
  refreshConfigLimiter,
};
