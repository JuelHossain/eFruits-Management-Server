const express = require("express");
const {
  getAllFruits,
  createAFruit,
  getAFruit,
  updateAFruit,
  deleteAFruit
} = require("../controller/fruitsController");
const verifyJwt = require("../middlewares/verifyJwt");

const fruitsRouter = express.Router();

fruitsRouter.route("/").get(getAllFruits).post(verifyJwt, createAFruit);
fruitsRouter
  .route("/:id")
  .get(getAFruit)
  .put(verifyJwt, updateAFruit)
  .delete(verifyJwt, deleteAFruit);

module.exports = fruitsRouter;
