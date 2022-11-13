const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    artiste: String,
    lieu: String,
    heure: String,
    datum: String,
    imageUrl: String,
    billeterie: String,
    phone: String,
  },
  {
    collection: "ConcertsTest",
  }
);

module.exports = mongoose.model("Concert", concertSchema);
