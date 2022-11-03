const router = require("express").Router();
const db = require("../configs/database");

router.put("/accept/:freelancerID", (req, res) => {
  const { freelancerID } = req.params;
  db.query(
    `UPDATE freelancer SET resubmit_verification=0,is_active=1 where freelancer_id="${freelancerID}";`,
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err.message,
        });
      } else if (result) {
        res.sendStatus(200);
      }
    }
  );
});

router.put("/reject/:freelancerID", (req, res) => {
  const { freelancerID } = req.params;
  db.query(
    `UPDATE freelancer SET resubmit_verification=1,is_active=0 where freelancer_id="${freelancerID}";`,
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err.message,
        });
      } else if (result) {
        db.query(
          `DELETE FROM verification_images WHERE freelancer_id="${freelancerID}";`,
          (err, result) => {
            if (err) {
              res.status(500).send({
                error: err.message,
              });
            } else if (result) {
              res.sendStatus(200);
            }
          }
        );
      }
    }
  );
});

router.get("/", (req, res) => {
  if (req.session.username === undefined) {
    res.render("login");
  } else {
    db.query(
      `select f.freelancer_id, f.first_name,f.last_name,f.username,f.email,f.gender,f.phone_number,f.region,f.country,f.state,f.registration_date , group_concat(v.image) as images from freelancer f inner join verification_images v on f.freelancer_id = v.freelancer_id where f.is_verified=1 and f.is_active=false group by f.freelancer_id;`,
      (err, result) => {
        if (err) {
          res.render("dashboard", {
            username: req.session.username,
            error: err.message,
          });
        } else if (result) {
          if (result.length === 0) {
            res.render("dashboard", {
              username: req.session.username,
              error: "No Pending Approvals",
            });
          } else {
            let resultJSON = JSON.parse(JSON.stringify(result));
            resultJSON.forEach((r) => {
              r.images = r.images.split(",");
            });
            res.render("dashboard", {
              username: req.session.username,
              data: resultJSON,
            });
          }
        }
      }
    );
  }
});

module.exports = router;
