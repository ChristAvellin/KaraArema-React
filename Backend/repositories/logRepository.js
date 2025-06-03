const Log = require('../models/Log');

const saveLog = (logData) => {
  return new Log(logData).save();
};

module.exports = { saveLog };