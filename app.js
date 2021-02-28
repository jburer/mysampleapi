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
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        console.log(
          "Connection to " +
            config.client.mongodb.defaultDatabase +
            " failed: " +
            error
        );
        throw error;
      } else {
        database = client.db(config.client.mongodb.defaultDatabase);
        collection = database.collection(
          config.client.mongodb.defaultCollection
        );
        console.log(
          "Connection to " +
            config.client.mongodb.defaultDatabase +
            " successful!"
        );
      }
    }
  );
});

// GET with Pagination Functionality
app.route("/shindigs").get((request, response) => {
  let page = request.query._page;
  let limit = request.query._limit;

  collection
    .find({})
    .skip(parseInt(page) * parseInt(limit))
    .limit(parseInt(limit))
    .toArray((error, result) => {
      if (error) {
        console.log("GET '/shindigs' failed: " + error);
        return response.status(500).send(error);
      } else {
        console.log("GET '/shindigs' successful!");
        response.send(result);
      }
    });
});

// GET by ID Functionality
app.route("/shindigs/id/:id").get((request, response) => {
  collection.findOne(
    { _id: new ObjectId(request.params.id) },
    (error, result) => {
      if (error) {
        console.log("GET '/shindigs/id' failed: " + error);
        return response.status(500).send(error);
      } else {
        console.log("GET '/shindigs/id' successful!");
        response.send(result);
      }
    }
  );
});

// GET Count Functionality
app.route("/shindigs/count").get((request, response) => {
  collection.countDocuments({}).then(
    function (count) {
      console.log("GET '/shindigs/count' successful: " + count);
      response.send({ count });
    },
    function (error) {
      console.log("GET '/shindigs/count' failed: " + error.message);
      response.status(500).send(error.message);
    }
  );
});

/*
// GET Count Functionality
app.get("/shindigs/count", (request, response) => {
  collection.countDocuments({}, (error, result) => {
    if (error) {
      console.log("Cannot GET '/shindigs/count': " + error.message);
      response.status(500).send(error.message);
    } else {
      console.log({ result });
      response.send({ result });
    }
  });
});
*/

//POST Functionality
app.post("/shindigs", (request, response) => {
  collection.insertOne(request.body, (error, result) => {
    if (error) {
      console.log("POST '/shindigs' failed: " + error);
      return response.status(500).send(error);
    } else {
      console.log("POST '/shindigs' successful!");
      response.send(result.result);
    }
  });
});

// DELETE by ID Functionality
app.delete("/shindigs/:id", (request, response) => {
  collection.deleteOne(
    { _id: new ObjectId(request.params.id) },
    (error, result) => {
      if (error) {
        console.log("DELETE '/shindigs/id' failed: " + error);
        return response.status(500).send(error);
      } else {
        console.log("DELETE '/shindigs/id' successful!");
        response.send(result);
      }
    }
  );
});

// PUT by ID Functionality
app.put("/shindigs/:id&:shindig", (request, response) => {
  console.log(request.params);
  console.log(request.params.id);
  console.log(request.params.shindig);
  collection.replaceOne(
    { _id: ObjectId(request.params.id) },
    JSON.parse(request.params.shindig),
    (error, result) => {
      if (error) {
        console.log("PUT '/shindigs/id' failed: " + error);
        return response.status(500).send(error);
      } else {
        console.log("PUT '/shindigs/id' successful!");
        response.send(result);
      }
    }
  );
});
