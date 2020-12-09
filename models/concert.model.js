const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    artiste: String,
    lieu: String,
    date: String,
    datum: String,
    imageUrl: String
  },
  {
      collection: "Concerts"
  }
);

module.exports = mongoose.model('Concert', concertSchema);