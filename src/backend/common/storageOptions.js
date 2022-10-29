const multer = require("multer");

const storageOptionsVerification = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "resources/images/verifications");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = { storageOptionsVerification };
