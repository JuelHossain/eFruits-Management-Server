const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

module.exports = client;
