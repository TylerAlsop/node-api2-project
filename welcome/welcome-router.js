const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res
        .json({
            message: "Welcome to the API from the Node-API2 Lesson! :D"
        })
})

module.exports = router