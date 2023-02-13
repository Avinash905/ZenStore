const express = require("express");
const auth = require("../middleware/auth");
const cartController = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.get(
  "/getcartitems/:id",
  auth.verifyUser,
  cartController.getcartitems
);

cartRouter.post(
  "/createcartitem/:id",
  auth.verifyUser,
  cartController.createcartitem
);

cartRouter.put(
  "/updatecount/:cartid",
  auth.verifyUser,
  cartController.updatecount
);

cartRouter.delete(
  "/deletecartitem/:id/:cartid",
  auth.verifyAdmin,
  cartController.deletecartitem
);

cartRouter.delete("/deleteall/:id", auth.verifyAdmin, cartController.deleteall);

module.exports = cartRouter;
