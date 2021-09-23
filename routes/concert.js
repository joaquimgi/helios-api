var express = require("express");
var router = express.Router();

// we import our user controller
var concert = require("../controllers/concert.controller");

/* GET concerts listing. */
router.get("/", concert.findAll);
router.get("/concert", concert.findConcert);
router.get("/concertId", concert.findConcertById);
router.get("/comingsoon", concert.findComingSoon);

/* POST a new concert */
router.post("/", concert.create);
router.post("/update", concert.update);

module.exports = router;
