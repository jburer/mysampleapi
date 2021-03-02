var config = {
  expressPort: 3100,
  client: {
    mongodb: {
      defaultDatabase: "mysimpledb",
      defaultCollection: "shindigs",
      defaultUri: "mongodb://mongo:27017"
    }
  }
};

module.exports = config;
