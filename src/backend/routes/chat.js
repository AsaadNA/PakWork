const router = require("express").Router();
const db = require("../configs/database");
const auth = require("../middlewares/auth");
const async = require("async");

//Retrieving the MessageList
router.get("/messagelist/:to", auth, (req, res) => {
  const { username } = res.locals;
  const { to } = req.params;
  db.query(
    `select * from messages where (sender="${username}" or reciever="${username}") and (sender="${to}" or reciever="${to}") ORDER BY timestamp asc;`,
    (e, re) => {
      if (e) {
        console.log(e.message);
        res.sendStatus(400);
      } else if (re.length > 0) {
        db.query(
          `UPDATE messages set read_status=1 where ((sender="${to}" or reciever="${to}") and (sender="${username}" or reciever="${username}")) and reciever != "${to}" and read_status=0;`,
          (e, r) => {
            if (e) {
              console.log(e.message);
              res.sendStatus(400);
            } else if (r) {
              res.status(200).send(re);
            }
          }
        );
      }
    }
  );
});

//Retriveing the User list here
router.get("/userlist", auth, (req, res) => {
  const { username } = res.locals;
  db.query(
    `select sender as user from messages union select reciever from messages where sender="${username}" or reciever="${username}";`,
    (er, re) => {
      if (er) {
        console.log(er.message);
        res.sendStatus(400);
      } else if (re.length > 0) {
        let userList = JSON.parse(JSON.stringify(re)).filter((r) => {
          return r.user !== username;
        });

        //Traverse the userList
        async.each(
          userList,
          (u, cb) => {
            db.query(
              `select * from messages where (sender="${username}" or reciever="${username}") and (sender="${u["user"]}" or reciever="${u["user"]}") ORDER BY timestamp desc limit 1;`,
              (e, r) => {
                if (r.length > 0) {
                  u["latest_message"] = r[0].message;
                  u["timestamp"] = r[0].timestamp;
                  //This will return read count differentiatiing the sender and the reciever
                  db.query(
                    `select count(*) as unread from messages where ((sender="${username}" or reciever="${username}") and (sender="${u["user"]}" or reciever="${u["user"]}")) and reciever != "${u["user"]}" and read_status=0;`,
                    (e, r) => {
                      if (r.length > 0) {
                        u["unread"] = r[0].unread;
                        cb();
                      } else {
                        cb();
                      }
                    }
                  );
                } else {
                  cb();
                }
              }
            );
          },
          (err) => {
            userList = userList.filter((u) => {
              return u["latest_message"] !== undefined;
            });
            res.status(200).send(userList);
          }
        );
      } else {
        res.sendStatus(400);
      }
    }
  );
});

//Used for search users to add to chat
router.get("/find/:username", (req, res) => {
  const { username } = req.params;
  db.query(
    `SELECT username from freelancer where username="${username}" UNION ALL SELECT username from client where username="${username}"`,
    (er, re) => {
      if (er) {
        console.log(er.message);
        res.sendStatus(400);
      } else if (re.length > 0) {
        res.status(200).send({
          data: {
            username: re[0].username,
          },
        });
      } else {
        res.sendStatus(400);
      }
    }
  );
});

module.exports = router;
