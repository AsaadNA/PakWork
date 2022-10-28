const express = require("express");
const randtoken = require("rand-token");

const db = require("../configs/database");
const returnLoginPayloadResponse =
  require("../common/helper").returnLoginPayloadResponse;
const generateEmailVerification =
  require("../common/helper").generateEmailVerification;

const emailVerificationSchema = require("../models/emailVerification");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `select user_type , freelancer_id as id from freelancer where email="${email}" and password="${password}" UNION 
    select user_type , company_client_id as id from company_client where email="${email}" and password="${password}" UNION
    select user_type , client_id as id from client where email="${email}" and password="${password}" UNION 
    select user_type , admin_id as id from administrator where email="${email}" and password="${password}"`,

    (e, r, f) => {
      if (e) {
        res.status(500).send({
          error: e.message,
        });
      } else if (r.length > 0) {
        if (r[0].user_type === "freelancer") {
          returnLoginPayloadResponse(
            res,
            `SELECT * from freelancer where freelancer_id="${r[0].id}"`
          );
        } else if (r[0].user_type === "company_client") {
          returnLoginPayloadResponse(
            res,
            `SELECT * from company_client where company_client_id="${r[0].id}"`
          );
        } else if (r[0].user_type === "client") {
          returnLoginPayloadResponse(
            res,
            `SELECT * from client where client_id="${r[0].id}"`
          );
        } else {
          returnLoginPayloadResponse(
            res,
            `SELECT * from administrator where admin_id="${r[0].id}"`
          );
        }
      } else {
        res.status(400).send({
          error: "Invalid email or password",
        });
      }
    }
  );
});

router.get("/verify/:uid", (req, res) => {
  const { uid } = req.params;
  const result = emailVerificationSchema.find({ uid: uid }, (err, data) => {
    if (err) {
      res.status(500).send({
        error: "Invalid Verification link",
      });
    } else if (data.length > 0) {
      const { email, userType } = data[0];
      let query = "";
      switch (userType) {
        case "freelancer":
          query = `UPDATE freelancer SET is_verified=1 where email="${email}"`;
          break;
        case "client":
          query = `UPDATE client SET is_verified=1 where email="${email}"`;
          break;
        case "company_client":
          query = `UPDATE company_client SET is_verified=1 where email="${email}"`;
          break;
      }
      db.query(query, (e, r, f) => {
        if (e) {
          res.status(400).send({
            error: e.message,
          });
        } else if (r) {
          emailVerificationSchema.deleteOne({ uid: uid }, (err, data) => {
            if (err) {
              res.status(500).send({
                error: err.message,
              });
            } else if (data) {
              res.status(200).send({
                message: "User has been verified",
              });
            } else {
              res.status(400).send({
                error: "Verification link does not exist",
              });
            }
          });
        } else {
          res.status(400).send({
            error: "Could not verify user email",
          });
        }
      });
    } else {
      res.status(400).send({
        error: "Verification link does not exist",
      });
    }
  });
});

router.post("/register/:userType", (req, res) => {
  const { userType } = req.params;
  let generatedID = randtoken.uid(45);
  if (userType === "freelancer" || userType === "client") {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      gender,
      phone_number,
      region,
      country,
      state,
    } = req.body;

    let query = "";
    if (userType === "freelancer") {
      query = `INSERT INTO freelancer(freelancer_id,first_name,last_name,username,email,password,gender,phone_number,region,country,state) VALUES ("${generatedID}","${first_name}","${last_name}","${username}","${email}","${password}","${gender}","${phone_number}","${region}","${country}","${state}");`;
    } else {
      query = `INSERT INTO client(client_id,first_name,last_name,username,email,password,gender,phone_number,region,country,state) VALUES ("${generatedID}","${first_name}","${last_name}","${username}","${email}","${password}","${gender}","${phone_number}","${region}","${country}","${state}");`;
    }

    db.query(query, (e, r, f) => {
      if (e) {
        res.status(400).send({
          error:
            "User already registered with the same username, phone or email",
        });
      } else if (r) {
        db.query(
          `INSERT into profile (profile_id,user_type) values ("${generatedID}" , "${userType}");`,
          (e, r, f) => {
            if (e) {
              res.status(500).send({
                error: e.message,
              });
            } else if (r) {
              generateEmailVerification(res, { email, userType });
            } else {
              res.status(400).send({
                error: "Error Creating Profile",
              });
            }
          }
        );
      } else {
        res.status(400).send({
          error: "Error registering freelancer",
        });
      }
    });
  } else if (userType === "company-client") {
    const { email, password, company_name, phone_number } = req.body;
    let query = `INSERT INTO company_client(company_client_id,email,password,company_name,phone_number) VALUES ("${generatedID}","${email}","${password}","${company_name}","${phone_number}");`;
    db.query(query, (e, r, f) => {
      if (e) {
        res.status(400).send({
          error:
            "Company already registered with the same company name, phone or email",
        });
      } else if (r) {
        db.query(
          `INSERT into profile (profile_id,user_type) values ("${generatedID}" , "company_client");`,
          (e, r, f) => {
            if (e) {
              res.status(500).send({
                error: e.message,
              });
            } else if (r) {
              generateEmailVerification(res, {
                email,
                userType: "company_client",
              }); //Generating email verification link
            } else {
              res.status(400).send({
                error: "Error Creating Profile",
              });
            }
          }
        );
      } else {
        res.status(400).send({
          error: "Error registering company",
        });
      }
    });
  } else if (userType === "admin") {
    const { email, password, username } = req.body;
    let query = `INSERT INTO administrator(admin_id,email,password,username) VALUES ("${generatedID}","${email}","${password}","${username}");`;
    db.query(query, (e, r, f) => {
      if (e) {
        res.status(400).send({
          error:
            "Administrator already registered with the same username or email",
        });
      } else if (r) {
        res.status(200).send({
          message: "Registration Successsful",
        });
      } else {
        res.status(400).send({
          error: "Error registering company",
        });
      }
    });
  } else {
    res.status(400).send("Invalid api endpoint");
  }
});

module.exports = router;
