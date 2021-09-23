var express = require("express");
var router = express.Router();

// we import our user controller
var user = require("../controllers/user.controller");

/* GET concerts listing. */
router.get("/", user.findAll);

module.exports = router;
