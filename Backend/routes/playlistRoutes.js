const express = require('express');
const router = express.Router();
const {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require('../controllers/playlistController');

const authMiddleware = require('../middlewares/authMiddleware');

// Toutes les routes nécessitent une auth
router.use(authMiddleware);

// Playlists
router.get('/', getPlaylists); // GET /playlists
router.post('/', createPlaylist); // POST /playlists
router.get('/:id', getPlaylistById); // GET /playlists/:id
router.put('/:id', updatePlaylist); // PUT /playlists/:id
router.delete('/:id', deletePlaylist); // DELETE /playlists/:id

// Songs dans une playlist
router.post('/:id/songs', addSongToPlaylist); // POST /playlists/:id/songs
router.delete('/:id/songs/:songId', removeSongFromPlaylist); // DELETE /playlists/:id/songs/:songId

module.exports = router;
