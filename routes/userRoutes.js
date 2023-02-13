const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get(
  "/getuser/:id/:userid",
  auth.verifyAdmin,
  userController.getuser
);

userRouter.get(
  "/getallusers/:id",
  auth.verifyAdmin,
  userController.getallusers
);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.put(
  "/updateprofile/:id",
  auth.verifyAdmin,
  userController.updateprofile
);

userRouter.delete(
  "/deleteuser/:id/:userid",
  auth.verifyAdmin,
  userController.deleteuser
);

module.exports = userRouter;
