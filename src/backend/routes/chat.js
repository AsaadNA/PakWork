const router = require("express").Router();
const db = require("../configs/database");

/*
        TEMP Testing
            - Freelancer to freelancer

        Warna freelancer Searches -> CC , client
        Warna Client Searches -> Freelancer
*/

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
