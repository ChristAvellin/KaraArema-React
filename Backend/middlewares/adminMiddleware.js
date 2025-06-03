const logger = require('../config/logger');

const adminMiddleware = (req, res, next) => {
   if (!req.user || req.user.role !== 'admin') {
    logger.warn('Accès admin non autorisé');
    return res.status(403).json({ error: 'Accès admin requis' });
  }
 next();   

};

module.exports = adminMiddleware;
