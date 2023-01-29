const multer = require('multer');
const path = require('path');

// direction to temp folder
const tempDir = path.join(__dirname, '../', 'temp');

// multer storage config
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// upload middleware
const upload = multer({
  storage: storageConfig,
});

module.exports = { upload };
