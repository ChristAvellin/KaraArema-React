const multer = require('multer');
const path = require('path');
const fs = require('fs');

let uploadConfig = {
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 Mo
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['audio/mpeg', 'image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = file.fieldname === 'song' ? 'uploads/songs' : 'uploads/images';
      const dir = path.join(__dirname, '..', folder);

      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      cb(null, `${baseName.replace(/\s+/g, '_')}_${timestamp}${ext}`);
    }
  })
};

let upload = multer(uploadConfig);

// 🔁 Fonction pour rafraîchir dynamiquement la config (à chaud)
const refreshConfig = () => {
  console.log('🔁 Rafraîchissement de la configuration upload...');

  // Ici tu peux recharger depuis un fichier, une DB, une variable, etc.
  // Exemple : réinitialiser les MIME types autorisés
  uploadConfig.fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  };

  // On doit re-créer l'instance de multer avec la nouvelle config
  upload = multer(uploadConfig);
};

// Export des middlewares d'upload
const uploadMiddleware = upload.fields([
  { name: 'song', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

module.exports = {
  uploadMiddleware,
  refreshConfig,
};
