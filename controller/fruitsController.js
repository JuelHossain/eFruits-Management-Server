const { ObjectId } = require("mongodb");
const { fruitCollection } = require("../db/collection");

const getAllFruits = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const size = parseInt(req.query.size, 10);
    const query = {};
    const cursor = await fruitCollection.find(query);
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
  } catch {
    res.send("there was something wrong");
  }
};

const createAFruit = async (req, res) => {
  try {
    const newFruit = req.body;
    const result = await fruitCollection.insertOne(newFruit);
    res.send(result);
  } catch {
    res.send("there was something wrong");
  }
};

const getFruitCount = async (req, res) => {
  try {
    const count = await fruitCollection.countDocuments();
    res.send({ count });
  } catch {
    res.send("there was something wrong");
  }
};

const getAFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    const result = await fruitCollection.findOne(query);
    res.send(result);
  } catch {
    res.send("there was something Wrong");
  }
};
const updateAFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFruit = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updatedDoc = {
      $set: updatedFruit
    };
    const result = await fruitCollection.updateOne(filter, updatedDoc, options);
    res.send(result);
  } catch {
    res.send("there was something wrong");
  }
};

const deleteAFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    const result = await fruitCollection.deleteOne(query);
    res.send(result);
  } catch {
    res.send("There was something wrong");
  }
};

module.exports = {
  getAllFruits,
  createAFruit,
  getFruitCount,
  getAFruit,
  updateAFruit,
  deleteAFruit
};
