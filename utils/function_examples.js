// Retrieve and return the sorted list of the next 5 concerts.
/* exports.findNext5Concerts = (req, res) => {
  Concert.find({})
    .then((concerts) => {
      let sortedConcerts = concerts.sort((a, b) => {
        var c = new Date(a.datum);
        var d = new Date(b.datum);
        return c - d;
      });

      let fiveLast = _.slice(
        sortedConcerts,
        sortedConcerts.length - 5,
        sortedConcerts.length
      );

      res.status(200).json(fiveLast);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving concerts.",
      });
    });
}; */

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
