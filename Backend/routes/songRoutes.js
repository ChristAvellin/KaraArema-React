const express = require('express');
const router = express.Router();

const {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  uploadSong
} = require('../controllers/songController');

const upload = require('../middlewares/uploadMiddleware');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validate = require('../middlewares/validate');
const { validateSong } = require('../validations/validationSchemas.js');

const createRateLimiter = require('../middlewares/rateLimiter');

const uploadLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20,
  message: 'Trop de modifications ou d’envois. Réessayez plus tard.'
});

router.get('/', getSongs); // GET all songs
router.get('/:id', getSongById); // GET song by ID

// POST upload chanson avec middleware multer et validation + auth + rate limiting
router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadLimiter,
  upload.fields([
    { name: 'song', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  //  validateSong.uploadSong
);

router.put('/:id', authMiddleware, adminMiddleware, uploadLimiter, validate(validateSong), updateSong);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSong);

module.exports = router;
