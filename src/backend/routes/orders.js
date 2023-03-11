const router = require("express").Router();
const {
  storageOptionOrderFiles,
  zipFilter,
} = require("../common/storageOptions");
const db = require("../configs/database");
const auth = require("../middlewares/auth");
const multer = require("multer");
const randtoken = require("rand-token");

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

//Retrieve Delievery Order File
router.get("/deliver/:orderID", auth, (req, res) => {
  const { orderID } = req.params;
  db.query(
    `SELECT file FROM order_files WHERE order_id="${orderID}"`,
    (e, r) => {
      if (e) {
        console.log(e.message);
        res.sendStatus(400);
      } else if (r.length > 0) {
        res.send(r);
      }
    }
  );
});

router.post(
  "/deliver/",
  auth,
  multer({ storage: storageOptionOrderFiles, fileFilter: zipFilter }).single(
    "zip"
  ),
  (req, res) => {
    const { orderID } = req.body;
    if (req.file) {
      let fileID = randtoken.uid(10);
      db.query(
        `INSERT INTO order_files (file_id,order_id,file) VALUES ("${fileID}" , "${orderID}" , "/zip/${req.file.filename}")`,
        (er, re) => {
          if (er) {
            console.log(er.message);
            res.sendStatus(400);
          } else if (re) {
            db.query(
              `UPDATE orders SET order_status="Delivered" WHERE order_id="${orderID}"`,
              (e, r) => {
                if (e) {
                  console.log(e.message);
                } else if (r) {
                  res.sendStatus(200);
                }
              }
            );
          }
        }
      );
    }
  }
);

module.exports = router;
