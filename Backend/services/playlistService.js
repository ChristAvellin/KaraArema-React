const playlistRepository = require('../repositories/playlistRepository');
const logger = require('../config/logger');

const getUserPlaylists = (userId, page = 1, limit = 10) => {
  const cacheKey = `playlists:${userId}:${page}:${limit}`;
  const cached = get(cacheKey);
  if (cached) {
    logger.info(`Playlists served from Valkey: ${cacheKey}`);
    return cached;
  }
  const playlists = playlistRepository.getUserPlaylists(userId, page, limit);
  setEx(cacheKey, 3600, playlists);
  return playlists;
};

const addSongToPlaylist = (playlistId, songId) => {
  const playlist = playlistRepository.addSongToPlaylist(playlistId, songId);
  del('playlists:*');
  return playlist;
};

module.exports = { getUserPlaylists, addSongToPlaylist };