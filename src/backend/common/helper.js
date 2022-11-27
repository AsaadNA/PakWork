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

const regenEmailVerification = (res, data) => {
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
    html: `<div style="display:flex;justify-content:center;align-items: center;flex-direction: column">
    <table
        style="width: 43vw;background-color: #fff;height: 80vh;text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
        <thead>
            <tr>
                <th><img src="https://i.ibb.co/XSfJj9C/template-header-verify.png" alt="template_header_verify.png" width="100%"></th>
            </tr>
        </thead>
        <tbody style="vertical-align: baseline;">
            <tr>
                <td>
                    <p
                        style="padding:0px 30px;font-size: 2.5vh;font-weight: bold;line-height: 25px;color: rgba(0, 0, 0, 0.8);">
                        Hello,
                        This email is being sent
                        to you in order for
                        you to verify
                        your email address on
                        pakwork. Please verify your
                        email address by clicking on the link below.
                        <br>
                        <br>
                        <a style="padding:2% 5%;border:none;height:40px;background-color: #006736;color:#fff;font-size: 2vh;font-weight: bold;border-radius: 30px;cursor: pointer;"
                                href="${generatedLink}" target="_blank">Verify
                                Email</a>
                        <br>
                        <br>
                        Thanks
                        <br>
                        Pakwork Team
                    </p>
                    <br>
                    <p style="font-size: 1.8vh;font-weight: bold;color: rgba(0, 0, 0, 0.6);">*Please note that the
                        verification link expires in 5
                        minutes*</p>
                </td>
            </tr>
        </tbody>
    </table>
    </div>`,
    // text: `Generated Verification link : ${generatedLink} , validity is for 5 min`,
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
    html: `<div style="display:flex;justify-content:center;align-items: center;flex-direction: column">
    <table
        style="width: 43vw;background-color: #fff;height: 80vh;text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
        <thead>
            <tr>
                <th><img src="https://i.ibb.co/XSfJj9C/template-header-verify.png" alt="./template_header_verify.png" width="100%"></th>
            </tr>
        </thead>
        <tbody style="vertical-align: baseline;">
            <tr>
                <td>
                    <p
                        style="padding:0px 30px;font-size: 2.5vh;font-weight: bold;line-height: 25px;color: rgba(0, 0, 0, 0.8);">
                        Hello,
                        This email is being sent
                        to you in order for
                        you to verify
                        your email address on
                        pakwork. Please verify your
                        email address by clicking on the link below.
                        <br>
                        <br>
                        <a style="padding:2% 5%;border:none;height:40px;background-color: #006736;color:#fff;font-size: 2vh;font-weight: bold;border-radius: 30px;cursor: pointer;"
                                href="${generatedLink}" target="_blank">Verify
                                Email</a>
                        <br>
                        <br>
                        Thanks
                        <br>
                        Pakwork Team
                    </p>
                    <br>
                    <p style="font-size: 1.8vh;font-weight: bold;color: rgba(0, 0, 0, 0.6);">*Please note that the
                        verification link expires in 5
                        minutes*</p>
                </td>
            </tr>
        </tbody>
    </table>
    </div>`,
    // text: `Generated Verification link : ${generatedLink} , validity is for 5 min`,
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
  regenEmailVerification,
};
