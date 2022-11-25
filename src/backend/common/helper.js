const db = require("../configs/database");
const transporter = require("../configs/mailer");
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const emailVerificationSchema = require("../models/emailVerification");

const returnLoginPayloadResponse = (res, query) => {
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

const regenEmailVerification = (res,data) => {
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
          return res.status(400).send({
            generatedLink,
            error: `New Verification Link sent to ${email}`,
          });
        } else {
          return res.status(400).send({
            error: "Could not sent verification email",
          });
        }
      });
    }
  });
}

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

module.exports = {
  returnLoginPayloadResponse,
  generateEmailVerification,
  regenEmailVerification
};
