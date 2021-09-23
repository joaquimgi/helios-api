const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "Credentials",
  }
);

module.exports = mongoose.model("Credentials", userSchema);
