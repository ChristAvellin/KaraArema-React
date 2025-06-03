const authService = require('../services/authService');
const logger = require('../config/logger');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    logger.error(`Register failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body.email, req.body.password, req.ip);
    res.status(200).json({ token, user });
  } catch (err) {
    logger.error(`Login failed: ${err.message}`);
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };