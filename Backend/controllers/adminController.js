const { refreshConfig } = require('../config/uploadConfig');
const logger = require('../config/logger');

const refreshConfigHandler = (req, res) => {
  try {
    refreshConfig();
    res.status(200).json({ message: 'Configuration refreshed successfully' });
  } catch (err) {
    logger.error(`Refresh config failed: ${err.message}`);
    res.status(500).json({ error: 'Failed to refresh configuration' });
  }
};

module.exports = { refreshConfigHandler };