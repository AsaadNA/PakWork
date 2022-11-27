const express = require("express");
const randtoken = require("rand-token");
const bcrypt = require("bcrypt");

const db = require("../configs/database");
const returnLoginPayloadResponse =
  require("../common/helper").returnLoginPayloadResponse;
const generateEmailVerification =
  require("../common/helper").generateEmailVerification;
const regenEmailVerification =
  require("../common/helper").regenEmailVerification;

const emailVerificationSchema = require("../models/emailVerification");
const emailVerification = require("../models/emailVerification");
const transporter = require("../configs/mailer");

const router = express.Router();

router.get("/logout/admin", (req, res) => {
  req.session.destroy();
  res.redirect("/api/v1/admin/");
});

router.post("/login/admin", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `SELECT username from administrator where email="${email}" and password="${password}"`,
    (e, r) => {
      if (e) {
        res.status(500).send({
          error: e.message,
        });
      } else if (r) {
        if (r.length !== 0) {
          req.session.username = r[0].username;
          res.sendStatus(200);
        } else {
          res.status(400).send({
            error: "Invalid Email or Password",
          });
        }
      }
    }
  );
});

router.post("/forgot/", (req, res) => {
  const { email } = req.body;

  //Find the user email and retrieve type
  //Generate a new password (Text);
  //Generate a new Hash;
  //Send the text to the email

  db.query(
    `select user_type, password, freelancer_id as id from freelancer where email="${email}" UNION 
    select user_type, password, company_client_id as id from company_client where email="${email}" UNION
    select user_type, password, client_id as id from client where email="${email}";`,
    (e, r) => {
      if (e) {
        res.status(500).send({ error: e.message });
      } else if (r.length > 0) {
        let generatedPassword = randtoken.uid(15);
        bcrypt.hash(generatedPassword, 10, (err, hash) => {
          console.log(generatedPassword);
          db.query(
            `UPDATE ${r[0]["user_type"]} SET password="${hash}" where email="${email}";`,
            (e, r) => {
              if (e) {
                res.status(500).send({ error: e.message });
              } else if (r) {
                let mailOptions = {
                  from: process.env.EMAILING_SYSTEM_EMAIL,
                  to: email,
                  subject: "New Password Generated",
                  html: `<div style="display:flex;justify-content:center;align-items: center;flex-direction: column;">
        <table
            style="width: 43vw;background-color: #fff;height: 80vh;text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
            <thead>
                <tr>
                    <th><img src="https://i.ibb.co/kSPxhr0/template-header-reset-password.png"
                            alt="template-header-reset-password.png"></th>
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
                            you to use
                            your new password on
                            pakwork. Please use this password on your account.
                            <br>
                            <br>
                            <span
                                style="padding:2.5% 15%;border:none;height:40px;background-color: #e4e2e2;color: rgba(0,0,0,0.7);font-size: 2.2vh;font-weight: bold;border-radius: 5px;cursor: pointer;">${generatedPassword}
                            </span>
                            <br>
                            <br>
                            Thanks
                            <br>
                            Pakwork Team
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`,
                };

                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    res.status(400).send({
                      error: err.message,
                    });
                  } else if (info) {
                    res
                      .status(200)
                      .send({ message: "New Password Sent to Email :)" });
                  } else {
                    res.status(400).send({
                      error: "Could not generate a new password",
                    });
                  }
                });
              } else {
                res
                  .status(400)
                  .send({ error: "Could not generate a new password" });
              }
            }
          );
        });
      } else {
        res.status(400).send({ error: "Could not find email" });
      }
    }
  );
});

//Freelancer, Client, Comapny Client Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `select user_type, password, is_verified, freelancer_id as id from freelancer where email="${email}" UNION 
    select user_type, password, is_verified,company_client_id as id from company_client where email="${email}" UNION
    select user_type, password, is_verified,client_id as id from client where email="${email}";`,
    (e, r) => {
      if (e) {
        res.status(500).send({ error: e.message });
      } else if (r.length > 0) {
        //Since email found compare Hashed Password
        bcrypt.compare(password, r[0]["password"], (err, result) => {
          if (result) {
            if (r[0]["is_verified"] === 1) {
              //if is verified ... proceed with login
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
              }
            } else {
              //else send an error or generate a new verification link
              let searchResult = emailVerificationSchema.find(
                { email },
                (err, data) => {
                  if (err) {
                    res.status(500).send({ error: err.message });
                  } else if (data.length > 0) {
                    res
                      .status(400)
                      .send({ error: "Verification link already sent" });
                  } else {
                    regenEmailVerification(res, {
                      email,
                      userType: r[0]["user_type"],
                    });
                  }
                }
              );
            }
          } else {
            res.status(400).send({ error: "Invalid Password" });
          }
        });
      } else {
        res.status(400).send({ error: "Email Address Not Found" });
      }
    }
  );
});

//Email Verification
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
              res.status(200).render("verified");
            } else {
              res.status(400).render("expired");
            }
          });
        } else {
          res.status(400).send({
            error: "Could not verify user email",
          });
        }
      });
    } else {
      res.status(400).render("expired");
    }
  });
});

//Registering All Users Types
router.post("/register/:userType", (req, res) => {
  const { userType } = req.params;
  const { email, phone_number, username, password } = req.body;

  //Check if email already registered across multiple user types;
  db.query(
    `select freelancer_id as id from freelancer where email="${email}" UNION 
    select company_client_id as id from company_client where email="${email}" UNION
    select client_id as id from client where email="${email}";`,
    (e, r) => {
      if (e) {
        res.status(500).send({ error: e.message });
      } else if (r.length <= 0) {
        //Check if phone number already registered across multiple user types;
        db.query(
          `select user_type , freelancer_id as id from freelancer where phone_number="${phone_number}" UNION 
          select user_type , company_client_id as id from company_client where phone_number="${phone_number}" UNION
          select user_type , client_id as id from client where phone_number="${phone_number}";`,
          (e, r) => {
            if (e) {
              res.status(500).send({ error: e.message });
            } else if (r.length <= 0) {
              //Check if username already registered across multiple client & freelancer types;
              db.query(
                `select user_type , freelancer_id as id from freelancer where username="${username}" UNION 
                select user_type , client_id as id from client where username="${username}"; `,
                (e, r) => {
                  if (e) {
                    res.status(500).send({ error: e.message });
                  } else if (r.length <= 0) {
                    let generatedID = randtoken.uid(45); //Generate UserID
                    bcrypt.hash(password, 10, function (err, hash) {
                      //Generate Hash Password
                      if (userType === "freelancer" || userType === "client") {
                        const {
                          first_name,
                          last_name,
                          username,
                          gender,
                          region,
                          country,
                          state,
                          dob,
                        } = req.body;
                        let query = "";
                        if (userType === "freelancer") {
                          query = `INSERT INTO freelancer(freelancer_id,first_name,last_name,username,email,password,gender,phone_number,region,country,state,dob) VALUES ("${generatedID}","${first_name}","${last_name}","${username}","${email}","${hash}","${gender}","${phone_number}","${region}","${country}","${state}","${dob}");`;
                        } else {
                          query = `INSERT INTO client(client_id,first_name,last_name,username,email,password,gender,phone_number,region,country,state) VALUES ("${generatedID}","${first_name}","${last_name}","${username}","${email}","${hash}","${gender}","${phone_number}","${region}","${country}","${state}");`;
                        }
                        db.query(query, (e, r, f) => {
                          if (e) {
                            if (e["sqlMessage"].includes("username_UNIQUE")) {
                              res
                                .status(500)
                                .send({ error: "Username already taken" });
                            } else {
                              res.status(500).send({
                                error: e.message,
                              });
                            }
                          } else if (r) {
                            db.query(
                              `INSERT into profile (profile_id,user_type) values ("${generatedID}" , "${userType}");`,
                              (e, r, f) => {
                                if (e) {
                                  res.status(500).send({
                                    error: e.message,
                                  });
                                } else if (r) {
                                  generateEmailVerification(res, {
                                    email,
                                    userType,
                                  });
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
                        const { company_name, country, region } = req.body;
                        let query = `INSERT INTO company_client(company_client_id,email,password,company_name,phone_number,country,region) VALUES ("${generatedID}","${email}","${hash}","${company_name}","${phone_number}","${country}","${region}");`;
                        db.query(query, (e, r, f) => {
                          if (e) {
                            if (
                              e["sqlMessage"].includes("company_name_UNIQUE")
                            ) {
                              res.status(500).send({
                                error: "Company Name already registered",
                              });
                            } else {
                              res.status(500).send({
                                error: e.message,
                              });
                            }
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
                      } else {
                        res.status(400).send("Invalid api endpoint");
                      }
                    });
                  } else {
                    res.status(400).send({
                      error: "Username Already Registered",
                    });
                  }
                }
              );
            } else {
              res.status(400).send({
                error: "Phone number already registered",
              });
            }
          }
        );
      } else {
        res.status(400).send({
          error: "Email Already Registered",
        });
      }
    }
  );
});

module.exports = router;
