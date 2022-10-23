const { MongoClient, ServerApiVersion } = require("mongodb")

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

module.exports = client
