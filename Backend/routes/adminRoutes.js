const express = require('express');
const router = express.Router();

const { refreshConfigHandler } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const createRateLimiter = require('../middlewares/rateLimiter');

// 🔒 Limite les appels pour éviter les abus de la fonction critique
const refreshLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Maximum 3 appels
  message: 'Trop de requêtes à /refresh-config. Réessayez plus tard.'
});

// ✅ Route sécurisée avec authentification, autorisation, et limitation
router.post('/refresh-config', refreshLimiter, authMiddleware, adminMiddleware, refreshConfigHandler);

module.exports = router;
