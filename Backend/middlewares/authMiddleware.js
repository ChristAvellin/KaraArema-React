const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token mal formaté' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role, // rôle stocké dans le token
    };
    next();
  } catch (err) {
    logger.error(`Échec authentification: ${err.message}`);
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authMiddleware;
