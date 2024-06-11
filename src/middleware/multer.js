const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory path
const uploadDir = path.join(__dirname, '../../public/uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
