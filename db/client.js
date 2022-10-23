const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://cluster0.o2iwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

module.exports = client;
