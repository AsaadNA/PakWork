const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb("Please upload only pdf files.", false);
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

const storageOptionsGigs = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "resources/images/gigs");
  },
  filename(req, file, cb) {
    cb(null, `${req.res.locals["userID"]}-${file.originalname}`);
  },
});

const storageOptionsPDFs = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "resources/files/pdfs");
  },
  file(req, file, cb) {
    cb(null, Date.now() + ".pdf");
  },
});

const storageOptionsProfilePic = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "resources/images/profiles");
  },
  filename(req, file, cb) {
    cb(null, `${req.res.locals["userID"]}`);
  },
});

const storageOptionsCVs = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "resources/files/cvs");
  },
  file(req, file, cb) {
    cb(null, `${reenamq.res.locals["userID"]}.pdf`);
  },
});

module.exports = {
  storageOptionsVerification,
  storageOptionsCVs,
  storageOptionsProfilePic,
  storageOptionsGigs,
  storageOptionsPDFs,
  pdfFilter,
  imageFilter,
};
