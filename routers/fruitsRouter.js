const express = require("express");
const {
  getAllFruits,
  createAFruit,
  getAFruit,
  updateAFruit,
  deleteAFruit
} = require("../controller/fruitsController");

const fruitsRouter = express.Router();

fruitsRouter.route("/").get(getAllFruits).post(createAFruit);
fruitsRouter.route("/:id").get(getAFruit).put(updateAFruit).delete(deleteAFruit);

module.exports = fruitsRouter;
