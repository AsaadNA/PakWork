const router = require("express").Router();
const auth = require("../middlewares/auth");
const randtoken = require("rand-token");
const async = require("async");

const db = require("../configs/database");
const multer = require("multer");
const { storageOptionsGigs, imageFilter } = require("../common/storageOptions");

router.put(
  "/:gigID",
  auth,
  multer({ storage: storageOptionsGigs, fileFilter: imageFilter }).array(
    "images",
    5
  ),
  (req, res) => {
    const { gigID } = req.params;
    const { title, details, category, starting_rate } = req.body;
    db.query(
      `UPDATE gigs SET title="${title}" , details="${details}" , category="${category}" , starting_rate="${starting_rate}" where gig_id="${gigID}";`,
      (e, r) => {
        if (e) {
          res.status(400).send({
            error: e.message,
          });
        } else if (r) {
          if (req.files === undefined || req.files.length === 0) {
            res.status(200).send({
              message: "Gig Updated without updating gig images",
            });
          } else {
            console.log(req.files);
            db.query(
              `DELETE from gigs_images where gig_id="${gigID}"`,
              (e, r) => {
                if (e) {
                  res.status(400).send({ error: e.message });
                } else if (r) {
                  async.forEachOfSeries(req.files, (file, idx, cb) => {
                    let imageID = randtoken.uid(10);
                    db.query(
                      `INSERT INTO gigs_images(image_id,gig_id,image) VALUES ("${imageID}" , "${gigID}" , "/images/gigs/${file.filename}");`,
                      (e, r) => {
                        cb();
                      }
                    );
                  });
                  res
                    .status(200)
                    .send({ message: "Gig Updated with gig images" });
                } else {
                  console.log("ERROR EH");
                  res
                    .status(400)
                    .send({ error: "Could not update gig with images" });
                }
              }
            );
          }
        } else {
          res.status(400).send({
            error: "Could not update gig info",
          });
        }
      }
    );
  }
);

router.delete("/:gigID", auth, (req, res) => {
  const { gigID } = req.params;
  db.query(`DELETE from gigs_images where gig_id="${gigID}";`, (e, r) => {
    if (e) {
      res.status(400).send({
        error: e.message,
      });
    } else if (r) {
      db.query(`DELETE from gigs where gig_id="${gigID}";`, (e, r) => {
        if (e) {
          res.status(400).send({
            error: e.message,
          });
        } else if (r) {
          res.status(200).send({
            message: "Gig Deleted",
          });
        } else {
          res.status(400).send({
            error: "Could not delete gig",
          });
        }
      });
    } else {
      res.status(400).send({
        error: "Could not delete gig images",
      });
    }
  });
});

//Multi-Form Data so images and data on the same form/modal
router.post(
  "/",
  auth,
  multer({ storage: storageOptionsGigs, fileFilter: imageFilter }).array(
    "images",
    5
  ),
  (req, res) => {
    const { userID } = res.locals;
    const { title, details, category, starting_rate } = req.body;

    if (req.files === undefined) {
      res.status(400).send({
        error: "Kindly Upload Gig Images",
      });
    } else if (req.files) {
      //gig images have been uploaded
      let generated_gigID = randtoken.uid(12);
      db.query(
        `INSERT into gigs (gig_id,title,details,category,freelancer_id,starting_rate) VALUES ("${generated_gigID}","${title}" , "${details}" , "${category}" , "${userID}" , "${starting_rate}");`,
        (e, r) => {
          if (e) {
            res.status(400).send({ error: "Gig title already exists" });
          } else if (r) {
            async.forEachOfSeries(req.files, (file, idx, cb) => {
              let imageID = randtoken.uid(10);
              db.query(
                `INSERT INTO gigs_images(image_id,gig_id,image) VALUES ("${imageID}" , "${generated_gigID}" , "/images/gigs/${file.filename}");`,
                (e, r) => {
                  cb();
                }
              );
            });
            res.status(200).send({ message: "Gig Created" });
          } else {
            res.status(400).send({ error: "Could not create gig" });
          }
        }
      );
    } else {
      res.status(400).send({
        error: "Could not create gig",
      });
    }
  }
);

router.get("/:gigID", (req, res) => {
  const { gigID } = req.params;
  db.query(
    `select g.title,g.details, g.category, g.posting_date, g.gig_rating, g.gig_id,g.freelancer_id, g.starting_rate, group_concat(gi.image) as gig_images , f.username , p.profile_picture , p.level, p.industry_name from gigs_images gi inner join gigs g on g.gig_id = gi.gig_id inner join freelancer f on g.freelancer_id= f.freelancer_id inner join profile p on f.freelancer_id = p.profile_id and g.gig_id= "${gigID}";`,
    (err, data) => {
      if (err) {
        res.status(400).send({ error: e.message });
      } else if (data.length > 0) {
        if (data[0].gig_images) {
          data[0].gig_images = data[0].gig_images.split(",");
        }
        res.status(200).send(data[0]);
      } else {
        res.status(400).send({ error: "Could not find the gig" });
      }
    }
  );
});

router.get("/", auth, (req, res) => {
  const { userID } = res.locals;
  db.query(
    `select g.title,g.details, g.category, g.posting_date, g.gig_rating, g.gig_id, g.freelancer_id, g.starting_rate, group_concat(gi.image) as images from gigs_images gi inner join gigs g on g.gig_id = gi.gig_id where g.freelancer_id= "${userID}" group by gi.gig_id;`,
    (e, r) => {
      if (e) {
        res.status(400).send({ error: e.message });
      } else if (r.length > 0) {
        res.status(200).send(r);
      } else {
        res.status(400).send({ error: "Could not find any gigs" });
      }
    }
  );
});

module.exports = router;
