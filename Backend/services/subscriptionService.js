const logger = require('../config/logger');

const createSubscription = (userId, plan) => {
  logger.info(`Subscription created for user ${userId}: ${plan}`);
  return { userId, plan, createdAt: new Date() }; // Integrate with payment provider
};

module.exports = { createSubscription };