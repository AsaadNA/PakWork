const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send({
        message: "Successfully loggedin",
        body: req.body
    });
});

module.exports = router;