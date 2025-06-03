
const logger = require('../config/logger.js');

const addToQueue = (queueName, jobData) => {
  client.rPush(`${queueName}:jobs`, JSON.stringify(jobData));
  logger.info(`Job added to ${queueName}`);
};

const processQueue = async (queueName, processor) => {
  while (true) {
    try {
      const job = await client.lPop(`${queueName}:jobs`);
      if (job) {
        await processor(JSON.parse(job));
        logger.info(`Processed job in ${queueName}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // évite de saturer le CPU
    } catch (err) {
      logger.error(`Queue ${queueName} processing failed: ${err.message}`);
    }
  }
};

module.exports = { addToQueue, processQueue };