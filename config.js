var config = {
  expressPort: 3100,
  client: {
    mongodb: {
      defaultDatabase: "mysimpledb",
      defaultCollection: "shindigs",
      defaultUri: "mongodb://0.0.0.0:27017"
    }
  }
};

module.exports = config;
