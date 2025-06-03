const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);