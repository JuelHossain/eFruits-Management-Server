require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());
// cors are okey then what is the problem?

// connect database
//-------------------------
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o2iwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insert data to database
//------------------------
const run = async () => {
  try {
    await client.connect();
    const fruit = client.db("eFruits-Management").collection("fruits");

    app.get("/fruits", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const query = {};
      const cursor = fruit.find(query);
      let fruits;
      if (page || size) {
        fruits = await cursor.skip(page*size).limit(size).toArray();
      } else {
      fruits = await cursor.toArray();
      }
      res.send(fruits);
    });
    app.get('/fruitsCount', async (req, res) => {
      const query = {};
      const cursor = fruit.find(query);
      const count = await fruit.countDocuments();
      res.send({ count });
    })
    app.get("/fruits/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await fruit.findOne(query);
      res.send(result);
    });
    app.post("/fruits", async (req, res) => {
      const newFruit = req.body;
      const result = await fruit.insertOne(newFruit);
      res.send(result);
      console.log(newFruit, "added successfully");
    });
    // updating user
    app.put("/fruits/:id", async (req, res) => {
      const id = req.params.id;
      const updatedFruit = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: updatedFruit,
      };
      const result = await fruit.updateOne(filter, updatedDoc, options);
      res.send(result);
      console.log(fruit.name, "updated");
    });
    //delete a fruitk
    app.delete("/fruits/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await fruit.deleteOne(query);
      res.send(result);
      console.log(fruit, "deleted");
    });
  } finally {
    console.log("Everythin is fine add an item.");
  }
};
run().catch(console.log);

// running the server
//-------------------------------------
app.get("/", (req, res) => {
  res.send(" Server is running");
});

app.listen(port, () => {
  console.log("server is running on", port);
});
