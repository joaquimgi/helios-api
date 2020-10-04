var express = require('express');
var router = express.Router();

// we import our user controller
var concert = require('../controllers/concert.controller');

/* GET concerts listing. */
router.get('/', concert.findAll);

/* GET followers for all concerts */
router.get('/followers', concert.findAllFollowers);
router.get('/nextBirthday', concert.findNextBirthday);

/* PUT a new concert */
router.post('/', concert.create);

module.exports = router;
