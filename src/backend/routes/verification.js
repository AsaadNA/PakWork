const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const db = require("../configs/database");

//Get the users who are email verified,not active, there resubmission is false
router.get("/", authMiddleware, async (req, res) => {
  const { userType } = res.locals;
  if (userType === "admin") {
    db.query(
      `select f.freelancer_id, f.first_name,f.last_name,f.username,f.email,f.gender,f.phone_number,f.region,f.country,f.state,f.registration_date , group_concat(v.image) as images from freelancer f inner join verification_images v on f.freelancer_id = v.freelancer_id where f.is_verified=1 and f.resubmit_verification=0 group by f.freelancer_id;`,
      (err, result) => {
        if (err) {
          res.status(500).send({
            error: err.message,
          });
        } else if (result) {
          if (result.length === 0) {
            res.status(200).send({
              message: "No Pending Approvals",
            });
          } else {
            let resultJSON = JSON.parse(JSON.stringify(result));
            resultJSON.forEach((r) => {
              r.images = r.images.split(",");
            });
            res.status(200).send({ result: resultJSON });
          }
        }
      }
    );
  } else {
    res.status(400).send({
      error: "Invalid user",
    });
  }
});

router.put("/accept/:freelancerID", authMiddleware, (req, res) => {
  const { userType } = res.locals;
  if (userType === "admin") {
    const { freelancerID } = req.params;
    db.query(
      `UPDATE freelancer SET resubmit_verification=0,is_active=1 where freelancer_id="${freelancerID}";`,
      (err, result) => {
        if (err) {
          res.status(500).send({
            error: err.message,
          });
        } else if (result) {
          res.status(200).send({
            message: "Freelancer has been activated",
          });
        }
      }
    );
  } else {
    res.status(400).send({
      error: "Invalid User",
    });
  }
});

router.put("/reject/:freelancerID", authMiddleware, (req, res) => {
  const { userType } = res.locals;
  if (userType === "admin") {
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
                res.status(200).send({
                  message: "Rejected Freelancer",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(400).send({
      error: "Invalid User",
    });
  }
});

module.exports = router;
