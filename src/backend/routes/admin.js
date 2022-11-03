const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session.username === undefined) {
    res.render("login");
  } else {
    res.send("already loggedin");
  }
});

module.exports = router;
