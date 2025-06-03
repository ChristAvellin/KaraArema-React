const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

const { validateUser } = require('../validations/validationSchemas.js');

const validate = require('../middlewares/validate');

const createRateLimiter = require('../middlewares/rateLimiter.js');

const registerLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 inscriptions max
  message: 'Trop de tentatives d\'inscription. Réessayez dans 15 minutes.'
});

const loginLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 tentatives max
  message: 'Trop de tentatives de connexion. Réessayez dans 10 minutes.'
});

router.post('/register',registerLimiter,  validate(validateUser), register);
router.post('/login', loginLimiter,  validate(validateUser),login);

module.exports = router;