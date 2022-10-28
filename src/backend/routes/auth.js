const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");

const db = require("../configs/database");
const transporter = require("../configs/mailer");

const emailVerificationSchema = require("../models/emailVerification");

//@MAYBE: Endpoint to create a verification link

const returnPayloadResponse = (res, query) => {
  db.query(query, (e, r, f) => {
    if (e) {
      return res.status(500).send({
        error: e.message,
      });
    } else if (r.length > 0) {
      let payload = {};
      if (r[0].user_type === "freelancer") {
        payload.freelancer_id = r[0].freelancer_id;
        payload.user_type = r[0].user_type;
        payload.email = r[0].email;
        payload.username = r[0].username;
      } else if (r[0].user_type === "company_client") {
        payload.company_client_id = r[0].company_client_id;
        payload.user_type = r[0].user_type;
        payload.email = r[0].email;
        payload.company_name = r[0].company_name;
      } else if (r[0].user_type === "client") {
        payload.client_id = r[0].client_id;
        payload.user_type = r[0].user_type;
        payload.email = r[0].email;
        payload.username = r[0].username;
      } else {
        payload.admin_id = r[0].admin_id;
        payload.user_type = r[0].user_type;
        payload.email = r[0].email;
        payload.username = r[0].username;
      }

      let token = jwt.sign({ data: payload }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.TOKEN_EXPIRY_TIME),
      });

      res.setHeader("x-access-token", token);
      return res.status(200).send({
        message: "Successfully logged in",
      });
    } else {
      return res.status(400).send({
        error: "Error Fetching Data",
      });
    }
  });
};

const generateEmailVerification = (res, data) => {
  let { email, userType } = data;
  let generatedUID = randtoken.uid(30);
  let generatedLink = `http://localhost:4000/api/v1/auth/verify/${generatedUID}`;

  const newData = new emailVerificationSchema({
    uid: generatedUID,
    email,
    userType,
  });

  let mailOptions = {
    from: process.env.EMAILING_SYSTEM_EMAIL,
    to: email,
    subject: "Kindly verify email",
    text: `Generated Verification link : ${generatedLink} , validity is for 5 min`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else if (info) {
      const result = newData.save((err, data) => {
        if (err) {
          return res.status(500).send({
            error: err.message,
          });
        } else if (data) {
          return res.status(200).send({
            generatedLink,
            message: `Registered successfully and verification link sent to ${email}`,
          });
        } else {
          return res.status(400).send({
            error: "Could not sent verification email",
          });
        }
      });
    }
  });
};

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
          returnPayloadResponse(
            res,
            `SELECT * from freelancer where freelancer_id="${r[0].id}"`
          );
        } else if (r[0].user_type === "company_client") {
          returnPayloadResponse(
            res,
            `SELECT * from company_client where company_client_id="${r[0].id}"`
          );
        } else if (r[0].user_type === "client") {
          returnPayloadResponse(
            res,
            `SELECT * from client where client_id="${r[0].id}"`
          );
        } else {
          returnPayloadResponse(
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
        generateEmailVerification(res, { email, userType });
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
        generateEmailVerification(res, { email, userType: "company_client" }); //Generating email verification link
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
