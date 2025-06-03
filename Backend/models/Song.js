const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  filePath: { type: String, required: true },
 
}, { timestamps: true });

songSchema.index({ title: 'text', artist: 'text', genre: 'text' });

module.exports = mongoose.model('Song', songSchema);