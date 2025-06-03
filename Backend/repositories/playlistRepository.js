const Playlist = require('../models/Playlist');

const getUserPlaylists = (userId, page = 1, limit = 10) => {
  return Playlist.find({ userId })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
};

const addSongToPlaylist = (playlistId, songId) => {
  return Playlist.findByIdAndUpdate(
    playlistId,
    { $addToSet: { songs: songId } },
    { new: true }
  );
};

module.exports = { getUserPlaylists, addSongToPlaylist };