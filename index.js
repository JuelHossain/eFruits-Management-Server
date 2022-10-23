/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 80;
const verifyJwt = require("./middlewares/verifyJwt");
const client = require("./db/client");
const fruitsRouter = require("./routers/fruitsRouter");
const loginRouter = require("./routers/loginRouter");
const { getFruitCount } = require("./controller/fruitsController");

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await client.connect();
    app.use("/fruits", fruitsRouter);
    app.use("/login", loginRouter);
    app.get("/fruitsCount", getFruitCount);
  } catch {
    console.log("There was some error");
  }
})();

app.get("/", verifyJwt, (req, res) => {
  res.send(" Server is running");
});

app.listen(port, () => {
  console.log("server is running on", port);
});
