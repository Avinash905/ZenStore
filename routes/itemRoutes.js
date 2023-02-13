const express = require("express");
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");

const itemRouter = express.Router();

itemRouter.get("/getitems", itemController.getitems);

itemRouter.get("/getitem/:itemid", itemController.getitem);

itemRouter.post("/createitem/:id", auth.verifyAdmin, itemController.createitem);

itemRouter.put(
  "/updateitem/:id/:itemid",
  auth.verifyAdmin,
  itemController.updateitem
);

itemRouter.delete(
  "/deleteitem/:id/:itemid",
  auth.verifyAdmin,
  itemController.deleteitem
);

module.exports = itemRouter;
