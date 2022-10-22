require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");
app.use(cors());
app.use(express.json());

// verifying jwt token
const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "forbidden" });
    }
    req.decoded = decoded;
    next();
  });
};
// connecting database
//-------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o2iwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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

    //auth
    app.post("/login", async (req, res) => {
      const user = req.body;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken });
    });

    // getting all fruits
    app.get("/fruits", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const query = {};
      const cursor = fruit.find(query);
      let fruits;
      if (page || size) {
        fruits = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
        fruits = await cursor.toArray();
      }
      res.send(fruits);
    });

    // getting all fruit count
    app.get("/fruitsCount", async (req, res) => {
      const query = {};
      const cursor = fruit.find(query);
      const count = await fruit.countDocuments();
      res.send({ count });
    });
    // getting one fruit with id
    app.get("/fruits/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await fruit.findOne(query);
      res.send(result);
    });

    // adding fruit to the data base
    app.post("/fruits", async (req, res) => {
      const newFruit = req.body;
      const result = await fruit.insertOne(newFruit);
      res.send(result);
      console.log(newFruit, "added successfully");
    });
    // updating fruits to the data base
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
    //deleting single fruit from data base
    app.delete("/fruits/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await fruit.deleteOne(query);
      res.send(result);
      console.log(fruit, "deleted");
    });
  } finally {
    console.log("Everything is fine.");
  }
};
run().catch(console.log);

// running the server
//-------------------------------------
app.get("/", verifyJwt, (req, res) => {
  res.send(" Server is running");
});

app.listen(port, () => {
  console.log("server is running on", port);
});
