const playlistService = require('../services/playlistService');
const logger = require('../config/logger');

const getPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getUserPlaylists(req.user.userId, req.query.page, req.query.limit);
    res.status(200).json(playlists);
  } catch (err) {
    logger.error(`Get playlists failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const newPlaylist = await playlistService.createPlaylist({
      name,
      description,
      isPublic,
      userId: req.user.userId
    });
    res.status(201).json(newPlaylist);
  } catch (err) {
    logger.error(`Create playlist failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await playlistService.getPlaylistById(req.params.id, req.user.userId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }
    res.status(200).json(playlist);
  } catch (err) {
    logger.error(`Get playlist by ID failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const updatedPlaylist = await playlistService.updatePlaylist(
      req.params.id,
      req.user.userId,
      req.body
    );
    if (!updatedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }
    res.status(200).json(updatedPlaylist);
  } catch (err) {
    logger.error(`Update playlist failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const result = await playlistService.deletePlaylist(req.params.id, req.user.userId);
    if (!result) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    logger.error(`Delete playlist failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.addSongToPlaylist(req.params.id, req.body.songId);
    res.status(200).json(playlist);
  } catch (err) {
    logger.error(`Add song to playlist failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.removeSongFromPlaylist(
      req.params.playlistId,
      req.params.songId,
      req.user.userId
    );
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist/song not found or access denied' });
    }
    res.status(200).json(playlist);
  } catch (err) {
    logger.error(`Remove song from playlist failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { 
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist
};