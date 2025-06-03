const multer = require('multer');
const path = require('path');
const fs = require('fs');

const audioDir = path.join(__dirname, '../../uploads/songs');
const imageDir = path.join(__dirname, '../../uploads/images');

// Créer les dossiers s'ils n'existent pas
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === 'song') {
      cb(null, audioDir);
    } else if (file.fieldname === 'image') {
      cb(null, imageDir);
    } else {
      cb(new Error('Champ de fichier non supporté'));
    }
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// Types autorisés
const allowedAudioTypes = ['audio/mpeg', 'audio/wav'];
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

// Filtre des fichiers selon champ et type mime
const fileFilter = (_req, file, cb) => {
  if (file.fieldname === 'song') {
    if (allowedAudioTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers audio (mp3, wav) sont autorisés pour le champ "song"'), false);
    }
  } else if (file.fieldname === 'image') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers images (jpeg, png, gif) sont autorisés pour le champ "image"'), false);
    }
  } else {
    cb(new Error('Champ de fichier non supporté'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20 MB max par fichier
});

module.exports = upload;
