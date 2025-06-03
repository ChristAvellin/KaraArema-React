const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');

// --- Config multer ---

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isSong = file.fieldname === 'song';
    const folder = isSong ? 'upload/songs' : 'upload/images';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const uniqueName = `${base}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// --- Services ---

const getFileUrl = (file) => {
  const type = file.destination.includes('songs') ? 'songs' : 'images';
  return `/uploads/${type}/${path.basename(file.path)}`;
};

const uploadFile = async (file) => {
  return {
    filePath: file.path,
    fileUrl: getFileUrl(file)
  };
};

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`✅ Deleted file: ${filePath}`);
  } catch (err) {
    console.error(`❌ Failed to delete file ${filePath}: ${err.message}`);
  }
};

module.exports = {
  upload,
  uploadFile,
  deleteFile
};
