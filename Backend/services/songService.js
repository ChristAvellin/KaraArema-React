const songRepository = require('../repositories/songRepository.js');
const logger = require('../config/logger.js');

const getAllSongs = async (page = 1, limit = 10, filters = {}) => {
  try {
    return await songRepository.getAllSongs(page, limit, filters, { createdAt: -1 });
  } catch (err) {
    logger.error(`getAllSongs failed: ${err.message}`);
    throw new Error('Unable to retrieve songs');
  }
};

const getSongById = async (id) => {
  try {
    return await songRepository.getSongById(id);
  } catch (err) {
    logger.error(`getSongById failed: ${err.message}`);
    throw new Error('Unable to retrieve song');
  }
};

const createSong = async (songData) => {
  try {
    return await songRepository.saveSong(songData);
  } catch (err) {
    logger.error(`createSong failed: ${err.message}`);
    throw new Error('Unable to create song');
  }
};

const updateSong = async (id, songData) => {
  try {
    return await songRepository.updateSong(id, songData);
  } catch (err) {
    logger.error(`updateSong failed: ${err.message}`);
    throw new Error('Unable to update song');
  }
};

const deleteSong = async (id) => {
  try {
    return await songRepository.deleteSong(id);
  } catch (err) {
    logger.error(`deleteSong failed: ${err.message}`);
    throw new Error('Unable to delete song');
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
};
