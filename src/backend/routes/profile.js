const router = require("express").Router();
const multer = require("multer");
const db = require("../configs/database");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, (req, res) => {
  const { userID, userType } = res.locals;
  let query = "";
  if (userType === "freelancer") {
    query = `select bio,level,degree,degree_period,company,profile_picture,secondary,higher_secondary,year_experience,
    cv,github_link,linkedin_link,registration_date from profile where profile_id="${userID}" and user_type="freelancer"`;
  } else if (userType === "client") {
    query = `select bio,company,proile_picture,linkedin_link,registration_date from profile where profile_id="${userID}" and user_type="client"`;
  } else if (userType === "company_client") {
    query = `select bio,company,company_website,profile_picture,industry_name,employeed_range,linkedin_link,registration_date from profile where profile_id="${userID}" and user_type="company_client"`;
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
  let query = "";
  if (userType === "freelancer") {
    const {
      bio,
      level,
      degree,
      degree_period,
      company,
      secondary,
      higher_secondary,
      year_experience,
      github_link,
      linkedin_link,
    } = req.body;
    query = `UPDATE profile SET bio="${bio}",level="${level}",degree="${degree}",degree_period="${degree_period}",company="${company}",secondary="${secondary}",higher_secondary="${higher_secondary}",year_experience=${year_experience},github_link="${github_link}",linkedin_link="${linkedin_link}" WHERE profile_id="${userID}";`;
  } else if (userType === "client") {
    const { bio, company, linkedin_link } = req.body;
    query = `UPDATE profile SET bio="${bio},company="${company}",linkedin_link="${linkedin_link}" WHERE profile_id="${userID}";`;
  } else if (userType === "company_client") {
    const {
      bio,
      company,
      company_website,
      industry_name,
      employeed_range,
      linkedin_link,
    } = req.body;
    query = `UPDATE profile SET bio="${bio}",company="${company}",company_website="${company_website}",industry_name="${industry_name}",employeed_range="${employeed_range}",linkedin_link="${linkedin_link}" WHERE profile_id="${userID}";`;
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
      res.status(200).send({
        message: "Updated Profile",
      });
    } else {
      res.status(400).send({
        error: "Could not find profile",
      });
    }
  });
});

///////////////////

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * from profile where profile_id="${id}";`, (e, r) => {
    if (e) {
      res.status(500).send({
        error: e.message,
      });
    } else if (r) {
      res.status(200).send(r);
    }
  });
});

module.exports = router;
