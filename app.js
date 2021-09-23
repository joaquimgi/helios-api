var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var concertRouter = require("./routes/concert");
var userRouter = require("./routes/user");

const cors = require("cors");

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.MONGO_DB_CONNECTION;

console.log("Database_URL", process.env.MONGO_DB_CONNECTION);

mongoose.connect(mongoDB, { useNewUrlParser: true }, (ref) => {
  console.log("Connected to mongo server.");
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    //console.log(names); // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
  });
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/concerts", concertRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
