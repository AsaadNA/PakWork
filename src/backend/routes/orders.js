const router = require("express").Router();
const db = require("../configs/database");
const auth = require("../middlewares/auth");

//TODO: Implement Company Client Here

router.get("/detail/:orderID", auth, (req, res) => {
  const { orderID } = req.params;
  db.query(`SELECT * FROM orders WHERE order_id="${orderID}"`, (er, re) => {
    if (er) {
      res.sendStatus(400);
    } else if (re.length > 0) {
      let data = re[0];
      db.query(
        `SELECT * from jobs_attached_files WHERE job_id="${orderID}"`,
        (err, result) => {
          if (err) {
            res.sendStatus(400);
          } else if (result.length > 0) {
            data.files = result;
            res.status(200).send(data);
          } else {
            data.files = null;
            res.status(200).send(data);
          }
        }
      );
    }
  });
});

router.put("/", auth, (req, res) => {
  const { userType, userID } = res.locals;
  const { username } = req.body.tokenData;

  let query = ``;
  switch (userType) {
    case "freelancer":
      query = `select o.order_id, o.title , o.category , c.username , p.profile_picture , o.amount , o.order_status, o.ending_date from orders o inner join client c inner join profile p on c.client_id = o.client_id WHERE o.freelancer_username="${username}" and c.client_id = p.profile_id;`;
      break;
    case "client":
      query = `select o.order_id, o.title , o.category, o.freelancer_username , p.profile_picture , o.amount , o.order_status, o.ending_date from orders o inner join freelancer f inner join profile p on f.username = o.freelancer_username WHERE o.client_id="${userID}" and f.freelancer_id = p.profile_id;`;
      break;
  }

  db.query(query, (er, re) => {
    if (er) {
      console.log(er);
      res.sendStatus(400);
    } else if (re) {
      res.status(200).send(re);
    }
  });
});

module.exports = router;
