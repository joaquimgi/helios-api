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
    heure: req.body.Heure || "",
    datum: req.body.Datum || "",
    imageUrl: req.body.imageUrl || "",
    phone: req.body.phone || "",
    billeterie: req.body.billeterie || "",
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

// Retrieve and return all Concert from the database.
exports.findConcert = (req, res) => {
  console.log("body", req.query);
  Concert.find({})
    .then((concerts) => {
      let concert = concerts.filter((el) => {
        return el.datum === req.query.datum && el.heure === req.query.heure;
      });
      res.status(200).json(concert);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving concerts.",
      });
    });
};

// Retrieve and return all Concert from the database.
exports.findConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.query.id);
    console.log(concert._id);
    res.json(concert);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving concerts.",
    });
  }
};

// Retrieve and return the sorted list of the next 5 concerts.
exports.findComingSoon = (req, res) => {
  Concert.find({})
    .then((concerts) => {
      let sortedConcerts = concerts.sort((a, b) => {
        let c = new Date(a.datum);
        let d = new Date(b.datum);
        return c - d;
      });

      let comingSoon = sortedConcerts.filter((el) => {
        let elDate = new Date(el.datum);
        let today = new Date();
        return elDate > today;
      });

      console.log(comingSoon);

      res.status(200).json(comingSoon);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving concerts.",
      });
    });
};

// Update a concert identified by the concertId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "title can not be empty",
    });
  }
  console.log("body", req.body);

  // Find concert and update it with the request body
  Concert.update(
    { _id: req.body.id },
    {
      title: req.body.title,
      description: req.body.description,
      artiste: req.body.artiste,
      lieu: req.body.lieu,
      heure: req.body.heure,
      datum: req.body.datum,
      imageUrl: req.body.imageUrl,
    },
    { overwrite: true }
  )
    .then((concert) => {
      if (!concert) {
        return res.status(404).send({
          message: "concert not found with heure " + req.body.heure,
        });
      }
      res.send(concert);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "concert not found with id " + req.body.heure,
        });
      }
      return res.status(500).send({
        message: "Error updating concert with id " + req.body.heure,
      });
    });
};
