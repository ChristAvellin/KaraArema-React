const cron = require('node-cron');
const songService = require('../services/songService');
const logger = require('../config/logger');

const warmCache = () => {
  cron.schedule('*/10 * * * *', async () => {
    try {
      logger.info('Warming cache');
      await songService.getAllSongs(1, 10, { genre: 'pop' });
      await songService.getAllSongs(1, 10, { genre: 'rock' });
      logger.info('Cache warmed');
    } catch (err) {
      logger.error(`Cache warming failed: ${err.message}`);
    }
  });
};

module.exports = warmCache;