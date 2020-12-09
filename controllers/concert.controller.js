const Concert = require("../models/concert.model");
const _ = require("lodash");
const moment = require("moment");

// Create and Save a new Concert
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Titre) {
    // If Titre is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: "Titre du concert can not be empty",
    });
  }

  // Create a new Concert
  const concert = new Concert({
    title: req.body.Titre,
    description: req.body.Description || "",
    artiste: req.body.Artiste || "",
    lieu: req.body.Lieu || "",
    date: req.body.Date || "",
    datum: req.body.Datum || "",
    imageUrl: req.body.imageUrl || "",
  });

  console.log(concert);

  // Save the concert in the database
  concert
    .save()
    .then((data) => {
      // we wait for insertion to be complete and we send the newly concert integrated
      res.send(data);
    })
    .catch((err) => {
      // In case of error during insertion of a new concert in database we send an
      // appropriate message
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the concert.",
      });
    });
};

// Retrieve and return all Concert from the database.
exports.findAll = (req, res) => {
  Concert.find({})
    .then((concerts) => {
      console.log("concerts", concerts);
      res.status(200).json(concerts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving concerts.",
      });
    });
};

// Retrieve and return the sorted list of all followers for all artists from the database.
exports.findAllFollowers = (req, res) => {
  Concert.find({})
    .then((concerts) => {
      const allFollowers = _.map(concerts, function (o) {
        var result = _.pick(o, ["Name", "Followers"]);
        //const sortedAllFollowers = _.orderBy(result, ['Followers']);
        return result;
      });

      const sortedAllFollowers = _.sortBy(
        allFollowers,
        function (e) {
          return e.Followers;
        },
        ["desc"]
      );
      const reverse = _.reverse(sortedAllFollowers);

      res.status(200).json(reverse);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving artists.",
      });
    });
};

exports.findNextBirthday = (req, res) => {
  Concert.find({})
    .then((concert) => {
      const allBirthday = _.map(concert, function (o) {
        var result = _.pick(o, ["Name", "Birthday"]);
        return result;
      });
      var Birthday = _.find(allBirthday, { Name: "Eminem" });
      Birthday.Birthday = "2019" + Birthday.Birthday.slice(4, 8);
      var obj = {
        Name: Birthday.Name,
        nextBirthday: moment(Birthday.Birthday, "YYYYMMDD").fromNow(),
      };
      res.status(200).json(obj);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Birthday of Artists.",
      });
    });
};

/* // Find a single Artist with an ArstistId
exports.findOne = (req, res) => {
  Artist.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userId
      });
    });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.firstName) {
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      title: req.body.firstName,
      content: req.body.lastName || ''
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId
      });
    });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send({ message: 'User deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.userId
      });
    });
}; */
