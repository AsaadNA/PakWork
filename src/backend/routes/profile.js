const router = require("express").Router();
const multer = require("multer");
const db = require("../configs/database");
const authMiddleware = require("../middlewares/auth");

router.get("/getverificationfeedback" , authMiddleware,(req,res) => {
  const {userID} = res.locals;
  console.log(userID);
  db.query(`SELECT resubmit_feedback from FREELANCER where freelancer_id="${userID}";` , (e,r) => {
    if(e) {
      res.status(400).send({error: e.messaged});
    } else if(r.length > 0) {
      res.status(200).send({feedback: r[0]['resubmit_feedback']});
    } else {
      res.sendStatus(400);
    }
  })
})

router.get("/", authMiddleware, (req, res) => {
  const { userID, userType } = res.locals;
  let query = "";
  if (userType === "freelancer") {
    query = `select p.profile_picture,p.level,f.first_name,f.last_name,f.username,f.country,p.year_experience,p.industry_name,p.bio,p.linkedin_link,p.github_link,f.is_verified,f.is_active,f.resubmit_verification from profile p inner join freelancer f on f.freelancer_id = p.profile_id where p.profile_id="${userID}";`
  } else if (userType === "client") { //TODO: Change This
    query = `select bio,company,proile_picture,linkedin_link,registration_date from profile where profile_id="${userID}" and user_type="client"`;
  } else if (userType === "company_client") { //TODO: Change this
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
  console.log("PUT PROFILE",req.body)
  let query = "";
  if (userType === "freelancer") {
    const {
      bio,
      //level,
      //degree,
      //degree_period,
      //company,
      //secondary,
      //higher_secondary,
      industry_name,
      year_experience,
      github_link,
      linkedin_link,
    } = req.body;
    query = `UPDATE profile SET industry_name="${industry_name}", bio="${bio}",year_experience=${year_experience},github_link="${github_link}",linkedin_link="${linkedin_link}" WHERE profile_id="${userID}";`;
  } else if (userType === "client") { //TODO: CHANGE THIS
    const { bio, company, linkedin_link } = req.body;
    query = `UPDATE profile SET bio="${bio},company="${company}",linkedin_link="${linkedin_link}" WHERE profile_id="${userID}";`;
  } else if (userType === "company_client") { //TODO: CHANGE THIS
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
