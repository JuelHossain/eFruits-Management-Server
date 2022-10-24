const express = require("express");
const jwt = require("jsonwebtoken");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const user = req.body;
  const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h"
  });
  res.send({ accessToken });
});

module.exports = loginRouter;
