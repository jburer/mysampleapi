const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("./config.js");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var urlString = config.client.mongodb.defaultUri;
var databaseString = config.client.mongodb.defaultDatabase;
var collectionString = config.client.mongodb.defaultCollection;

// Add Access Control Allow Origin headers
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect to DB
app.listen(config.expressPort, () => {
  MongoClient.connect(
    urlString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        console.log("Connection to " + databaseString + " failed: " + error);
        throw error;
      } else {
        database = client.db(databaseString);
        collection = database.collection(collectionString);
        console.log("Connection to " + databaseString + " successful!");
      }
    }
  );
});

// GET with Pagination
app.route("/" + collectionString).get((request, response) => {
  let page = parseInt(request.query._page);
  let limit = parseInt(request.query._limit);
  let skip = page * limit;

  collection
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray((error, result) => {
      if (error) {
        console.log("GET '/" + collectionString + "' failed: " + error);
        return response.status(500).send(error);
      } else {
        console.log("GET '/" + collectionString + "' successful!");
        response.send(result);
      }
    });
});

// GET by ID
app.route("/" + collectionString + "/id/:id").get((request, response) => {
  let idInt = parseInt(request.params.id);

  collection.findOne({ id: idInt }, (error, result) => {
    if (error) {
      console.log("GET '/" + collectionString + "' failed: " + error);
      return response.status(500).send(error);
    } else {
      console.log("GET '/" + collectionString + "/id' successful!");
      response.send(result);
    }
  });
});

// GET Count
app.route("/" + collectionString + "/count").get((request, response) => {
  collection.countDocuments({}).then(
    function (count) {
      console.log("GET '/" + collectionString + "/count' successful: " + count);
      response.send({ count });
    },
    function (error) {
      console.log(
        "GET '/" + collectionString + "/count' failed: " + error.message
      );
      response.status(500).send(error.message);
    }
  );
});

//POST
app.post("/" + collectionString, (request, response) => {
  console.log(request.body);
  collection.insertOne(request.body, (error, result) => {
    if (error) {
      console.log("POST '/" + collectionString + "' failed: " + error);
      return response.status(500).send(error);
    } else {
      console.log("POST '/" + collectionString + "' successful!");
      response.send(result.result);
    }
  });
});

// DELETE by ID
app.delete("/" + collectionString + "/id/:id", (request, response) => {
  let idInt = parseInt(request.params.id);

  collection.deleteOne({ id: idInt }, (error, result) => {
    if (error) {
      console.log("DELETE '/" + collectionString + "/id' failed: " + error);
      return response.status(500).send(error);
    } else {
      console.log("DELETE '/" + collectionString + "/id' successful!");
      response.send(result.result);
    }
  });
});

// PUT by ID
app.put("/" + collectionString + "/:id&:shindig", (request, response) => {
  let idInt = parseInt(request.params.id);
  let shindigObject = JSON.parse(request.params.shindig);
  delete shindigObject["_id"];

  collection.update({ id: idInt }, shindigObject, (error, result) => {
    if (error) {
      console.log("PUT '/" + collectionString + "/id' failed: " + error);
      return response.status(500).send(error);
    } else {
      console.log("PUT '/" + collectionString + "/id' successful!");
      response.send(result);
    }
  });
});
