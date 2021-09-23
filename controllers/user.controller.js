const User = require("../models/user.model");
const _ = require("lodash");

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {
  User.find({})
    .then((user) => {
      console.log("user", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
