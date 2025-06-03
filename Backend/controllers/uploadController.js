const uploadService = require('../services/uploadService');
const logger = require('../config/logger');

const uploadSong = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, artist, genre } = req.body;
    if (!title || !artist || !genre) {
      // Supprime le fichier uploadé si metadata manquante
      await uploadService.deleteFile(req.file.path);
      return res.status(400).json({ error: 'Missing required metadata: title, artist, genre' });
    }

    const fileInfo = await uploadService.uploadSongFile(req.file);

    // Ici tu peux appeler songService pour créer la ressource dans la BDD avec fileInfo.fileUrl

    logger.info(`Song uploaded: ${title} by ${artist}`);

    res.status(201).json({
      message: 'Upload successful',
      song: {
        title,
        artist,
        genre,
        fileUrl: fileInfo.fileUrl
      }
    });
  } catch (err) {
    logger.error(`Upload failed: ${err.message}`);

    if (req.file) {
      await uploadService.deleteFile(req.file.path);
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports =  uploadSong ;
