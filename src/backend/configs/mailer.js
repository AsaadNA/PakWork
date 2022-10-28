const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILING_SYSTEM_EMAIL,
    pass: process.env.EMAILING_SYSTEM_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
