const express = require("express");
const userRouter = express.Router();
const { registerUserController, loginUserController } = require("./userController");

userRouter.post("/register", registerUserController);

userRouter.post("/login", loginUserController);

// userRouter.get("/");

module.exports = { userRouter };
