const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const db = require("../configs/database");

const returnPayloadResponse = (res, query) => {
  db.query(query, (e, r, f) => {
    if (e) {
      return res.status(500).send({
        error: "Internal server error",
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
      } else {
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `select user_type , freelancer_id as id from freelancer where email="${email}" and password="${password}" UNION 
    select user_type , company_client_id as id from company_client where email="${email}" and password="${password}" UNION
    select user_type , client_id as id from client where email="${email}" and password="${password}"`,
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
        } else {
          returnPayloadResponse(
            res,
            `SELECT * from client where client_id="${r[0].id}"`
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

module.exports = router;
