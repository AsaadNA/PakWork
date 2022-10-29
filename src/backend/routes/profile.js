const router = require("express").Router();
const multer = require("multer");
const db = require("../configs/database");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, (req, res) => {
  const { userID, userType } = res.locals;
  let query = "";
  if (userType === "freelancer") {
    query = `select bio,level,degree,degree_period,company,profile_picture,secondary,higher_secondary,year_experience,
    cv,github_link,linkedin_link from profile where profile_id="${userID}" and user_type="freelancer"`;
  } else if (userType === "client") {
    ///
  } else if (userType === "company_client") {
    //
  } else {
    res.status(400).send({
      error: "Invalid Profile",
    });
  }

  db.query(query, (e, r) => {
    if (e) {
      res.status(500).send({
        error: e.message,
      });
    } else if (r) {
      res.status(200).send(r);
    } else {
      res.status(400).send({
        error: "Could not find profile",
      });
    }
  });
});

router.put("/", authMiddleware, (req, res) => {
  const { userID, userType } = res.locals;
});

///////////////////

router.get("/:id", (req, res) => {
  //
});

module.exports = router;
