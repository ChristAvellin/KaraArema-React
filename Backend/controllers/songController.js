const songService = require('../services/songService');
const logger = require('../config/logger');
const fs = require('fs');
const path = require('path');

// Récupérer toutes les chansons
const getSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    res.status(200).json(songs);
  } catch (err) {
    logger.error(`getSongs failed: ${err.message}`);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des chansons.' });
  }
};

// Récupérer une chanson par ID
const getSongById = async (req, res) => {
  try {
    const song = await songService.getSongById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Chanson non trouvée.' });
    }
    res.status(200).json(song);
  } catch (err) {
    logger.error(`getSongById failed: ${err.message}`);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de la chanson.' });
  }
};

// Créer une nouvelle chanson (sans upload, juste données)
const createSong = async (req, res) => {
  try {
    const songData = req.body;
    const newSong = await songService.createSong(songData);
    res.status(201).json(newSong);
  } catch (err) {
    logger.error(`createSong failed: ${err.message}`);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la chanson.' });
  }
};

// Mettre à jour une chanson
const updateSong = async (req, res) => {
  try {
    const songData = req.body;
    const updatedSong = await songService.updateSong(req.params.id, songData);
    if (!updatedSong) {
      return res.status(404).json({ error: 'Chanson non trouvée.' });
    }
    res.status(200).json(updatedSong);
  } catch (err) {
    logger.error(`updateSong failed: ${err.message}`);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la chanson.' });
  }
};

// Supprimer une chanson
const deleteSong = async (req, res) => {
  try {
    const deleted = await songService.deleteSong(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Chanson non trouvée.' });
    }
    res.status(200).json({ message: 'Chanson supprimée avec succès.' });
  } catch (err) {
    logger.error(`deleteSong failed: ${err.message}`);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de la chanson.' });
  }
};

// Upload d’une chanson avec fichiers (audio + image)
const uploadSong = async (req, res) => {
  try {
    const songData = req.body;

    // Champs obligatoires
    if (!songData.title || !songData.artist || !songData.genre) {
      return res.status(400).json({ error: 'Les champs title, artist et genre sont obligatoires.' });
    }

    // Fichier audio obligatoire
    if (!req.files || !req.files.song || req.files.song.length === 0) {
      return res.status(400).json({ error: 'Le fichier audio est obligatoire.' });
    }

    const audioFile = req.files.song[0];
    songData.fileUrl = `${req.protocol}://${req.get('host')}/uploads/songs/${audioFile.filename}`;

    // Image optionnelle
    if (req.files.image && req.files.image.length > 0) {
      const imageFile = req.files.image[0];
      songData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${imageFile.filename}`;
    } else {
      songData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/default.jpg`;
    }

    // Crée la chanson en base
    const newSong = await songService.createSong(songData);

    res.status(201).json(newSong);
  } catch (err) {
    logger.error(`Upload song failed: ${err.message}`);

    // Nettoyer fichiers uploadés en cas d’erreur
    if (req.files) {
      for (const key in req.files) {
        req.files[key].forEach(file => {
          const folder = key === 'song' ? 'songs' : 'images';
          const filePath = path.join(__dirname, '../../uploads', folder, file.filename);
          fs.unlink(filePath, unlinkErr => {
            if (unlinkErr) {
              logger.error(`Failed to delete file ${filePath}: ${unlinkErr.message}`);
            }
          });
        });
      }
    }

    res.status(500).json({ error: 'Erreur serveur lors de l\'upload de la chanson.' });
  }
};

module.exports = {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  uploadSong,
};
