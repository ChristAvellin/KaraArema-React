const Song = require('../models/Song');

const getAllSongs = async (page = 1, limit = 10, filters = {}, sort = { title: 1 }) => {
  const query = {};

  if (filters.genre) query.genre = filters.genre;
  if (filters.artist) query.artist = filters.artist;

  // Supporte la recherche par mot-clé
  if (filters.search) {
    query.$text = { $search: filters.search}; 
  }

  const skip = (page - 1) * limit;

  const songs = await Song.find(query)
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Song.countDocuments(query);

  return {
    data: songs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const saveSong = async (songData) => {
  const song = new Song(songData);
  return await song.save();
};

module.exports = { getAllSongs, saveSong };
