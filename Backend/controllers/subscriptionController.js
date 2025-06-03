const subscriptionService = require('../services/subscriptionService');
const logger = require('../config/logger');

const createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.user.userId, req.body.plan);
    res.status(201).json(subscription);
  } catch (err) {
    logger.error(`Create subscription failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createSubscription };