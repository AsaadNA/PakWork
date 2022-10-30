const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
const storageOptionsVerification = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "resources/images/verifications");
  },
  filename(req, file, cb) {
    cb(null, `${req.res.locals["userID"]}-${file.originalname}`);
  },
});

module.exports = { storageOptionsVerification, imageFilter };
