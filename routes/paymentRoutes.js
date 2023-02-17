const express = require("express");
const auth = require("../middleware/auth");
const paymentController = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.get("/getkey/:id", auth.verifyUser, paymentController.getkey);

paymentRouter.post(
  "/checkout/:id",
  auth.verifyUser,
  paymentController.checkout
);

paymentRouter.post(
  "/paymentverify/:id",
  auth.verifyUser,
  paymentController.paymentverify
);

module.exports = paymentRouter;
