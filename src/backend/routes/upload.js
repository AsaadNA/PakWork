const router = require("express").Router();
const db = require("../configs/database");
const authMiddleware = require("../middlewares/auth");
const multer = require("multer");
const randtoken = require("rand-token");

const async = require("async");

const {
  imageFilter,
  pdfFilter,
  storageOptionsCVs,
  storageOptionsVerification,
  storageOptionsProfilePic,
} = require("../common/storageOptions");

router.post(
  "/cv",
  authMiddleware,
  multer({
    storage: storageOptionsCVs,
    fileFilter: pdfFilter,
  }).single("pdf"),
  (req, res) => {
    const { userID, userType } = res.locals;
    if (userType === "freelancer") {
      if (req.file === undefined) {
        res.status(400).send({
          error: "Kindly Upload CV",
        });
      } else if (req.file) {
        db.query(
          `UPDATE profile SET cv="/files/cvs/${req.file.filename}" where profile_id="${userID}";`,
          (e, r) => {
            if (e) {
              res.status(500).send({
                error: e.message,
              });
            } else if (r) {
              res.status(200).send({
                message: "Updated CV",
              });
            }
          }
        );
      }
    } else {
      res.status(400).send({
        error: "Invalid User",
      });
    }
  }
);

router.post(
  "/profile-pic",
  authMiddleware,
  multer({
    storage: storageOptionsProfilePic,
    fileFilter: imageFilter,
  }).single("image"),
  (req, res) => {
    const { userID } = res.locals;
    if (req.file === undefined) {
      res.status(400).send({
        error: "Kindly upload a profile pic",
      });
    } else if (req.file) {
      db.query(
        `UPDATE profile SET profile_picture="/images/profiles/${req.file.filename}" WHERE profile_id="${userID}"`,
        (err, r) => {
          if (err) {
            res.status(500).send({
              error: err.message,
            });
          } else if (r) {
            res.status(200).send({
              message: "Profile Pic has been uploaded",
            });
          }
        }
      );
    }
  }
);

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
