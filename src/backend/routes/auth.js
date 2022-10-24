const express = require('express');
const router = express.Router();

const db = require('../configs/database')

router.post('/', (req, res) => {
    db.query("SELECT * from freelancer", (e, r, f) => {
        if (e) {
            console.log(e.message);
        } else {
            console.log(r[0]);
        }
    })
    res.send({
        message: "Successfully loggedin",
        body: req.body
    });
});

module.exports = router;