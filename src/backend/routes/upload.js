const router = require("express").Router();
const db = require("../configs/database");
const authMiddleware = require("../middlewares/auth");
const multer = require("multer");
const randtoken = require("rand-token");

const async = require("async");

const {
  imageFilter,
  storageOptionsVerification,
} = require("../common/storageOptions");

router.post(
  "/verification",
  authMiddleware,
  multer({
    storage: storageOptionsVerification,
    fileFilter: imageFilter,
  }).array("images", 5),
  (req, res) => {
    const { userID, userType } = res.locals;
    if (userType === "freelancer") {
      if (req.files === undefined) {
        res.status(400).send({
          error: "Kindly Upload Verification Images",
        });
      } else if (req.files) {
        async.forEachOfSeries(req.files, (file, idx, cb) => {
          let imageID = randtoken.uid(10);
          db.query(
            `INSERT INTO verification_images(image_id,image,freelancer_id) VALUES ("${imageID}","/images/verifications/${file.filename}","${userID}");`,
            (e, r) => {
              cb();
            }
          );
        });
      }
      res.status(200).send("Uploaded Verification Images");
    } else {
      res.status(400).send({
        error: "Invalid User",
      });
    }
  }
);
module.exports = router;
