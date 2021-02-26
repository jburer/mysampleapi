var config = {
  expressPort: 3100,
  client: {
    mongodb: {
      defaultDatabase: "mysampledb",
      defaultCollection: "shindigs",
      defaultUri: "mongodb://localhost:27017"
    }
  }
};

module.exports = config;
