/*
  This is the entry point for the Mongopop Express app; it's invoked
  from `Mongopop/bin/www`
*/

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();

// The only required route is for the calls to the mongopop API
var pop = require("./routes/pop");

// Makes the generated html easier to read
app.locals.pretty = true;

// View engine setup. Jade has now been renamed Pug. The view engine generates
// the actual html our Jade/Pug templates. Only the error page is actually
// rendered on the server (Express) side; the rest is generated by the client
// application (e.g. Angular or React).
app.set("views", path.join(__dirname, "views"));

// ORIGINAL
//app.set('view engine', 'jade');
app.set("view engine", "pug");

// Indicate the middleware that Express should use
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The `public` folder will contain the files that need to be accessed
// by the client app (e.g. Angular .js files).
app.use(express.static(path.join(__dirname, "public")));

// Define a single route; to be used to provide the Mongopop Restfull
// API
app.use("/pop", pop);

// For any other routes, set the status to 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
