const client = require("./client");

const fruitCollection = client.db("eFruits-Management").collection("fruits");

module.exports = { fruitCollection };
