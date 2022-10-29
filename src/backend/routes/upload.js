const router = require("express").Router();
const db = require("../configs/database");
const authMiddleware = require("../middlewares/auth");
const multer = require("multer");

const { storageOptionsVerification } = require("../common/storageOptions");

router.post(
  "/verification",
  authMiddleware,
  multer({ storage: storageOptionsVerification }).array("images", 5),
  (req, res) => {
    if (req.file) {
      res.status(200).send("Files uploaded");
    } else {
      res.status(400).send("Files not uploaded");
    }
  }
);
module.exports = router;
