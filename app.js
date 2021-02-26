const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("./config.js");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var database, collection;

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
    config.client.mongodb.defaultUri,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(config.client.mongodb.defaultDatabase);
      collection = database.collection(config.client.mongodb.defaultCollection);
      console.log(
        "Connected to `" + config.client.mongodb.defaultDatabase + "`!"
      );
    }
  );
});

// GET with Pagination Functionality
app.get("/shindigs", (request, response) => {
  //console.log(request);
  let page = request.query._page;
  let limit = request.query._limit;
  console.log(page);
  console.log(limit);
  //collection.find({}).toArray((error, result) => {
  collection
    .find({})
    .skip(parseInt(page) * parseInt(limit))
    .limit(parseInt(limit))
    .toArray((error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send(error);
      }
      response.send(result);
      //console.log(response);
    });
});

// GET Count Functionality
app.get("/shindigs/count", (request, response) => {
  collection.countDocuments({}).then(
    function (count) {
      response.send({ count });
    },
    function (err) {
      console.log("countDocuments failed: " + err.message);
      response.status(500).send(err.message);
    }
  );
});

// GET by ID Functionality
app.get("/shindigs/:id", (request, response) => {
  collection.findOne(
    { _id: new ObjectId(request.params.id) },
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send(error);
      }
      response.send(result);
      console.log(result);
    }
  );
});

//POST Functionality
app.post("/shindigs", (request, response) => {
  collection.insertOne(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});

// DELETE by ID Functionality
app.delete("/shindigs/:id", (request, response) => {
  collection.deleteOne(
    { _id: new ObjectId(request.params.id) },
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send(error);
      }
      response.send(result);
      console.log(result);
    }
  );
});

// PUT by ID Functionality
app.put("/shindigs/:id&:shindig", (request, response) => {
  console.log(request.params);
  console.log(JSON.parse(request.params.shindig));
  collection.replaceOne(
    { _id: request.params.id },
    JSON.parse(request.params.shindig),
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send(error);
      }
      response.send(result);
      console.log(result);
    }
  );
});
