const { client } = require('../config/valkey');
const fs = require('fs').promises;
const path = require('path');
const logger = require('../config/logger');

const cleanup = async () => {
  try {
    const keys = await client.keys('session:*');
    for (const key of keys) {
      const session = await client.get(key);
      if (session && Date.now() - JSON.parse(session).lastActive > 24 * 3600 * 1000) {
        await client.del(key);
        logger.info(`Deleted session: ${key}`);
      }
    }
    const songDir = path.join(__dirname, '../../uploads/songs');
    const files = await fs.readdir(songDir);
    for (const file of files) {
      const stats = await fs.stat(path.join(songDir, file));
      if (Date.now() - stats.mtimeMs > 30 * 24 * 3600 * 1000) {
        await fs.unlink(path.join(songDir, file));
        logger.info(`Deleted file: ${file}`);
      }
    }
  } catch (err) {
    logger.error(`Cleanup failed: ${err.message}`);
  }
};

cleanup();