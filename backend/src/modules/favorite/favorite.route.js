const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  getByIdController,
  getAllFavoriteController,
  createFavoriteController,
  deleteFavoriteController,
} = require("./favorite.controller");

const favoriteRouter = express.Router();

favoriteRouter.use(authMiddleware);

favoriteRouter.get("/", getAllFavoriteController);
favoriteRouter.post("/:googleId", createFavoriteController);
favoriteRouter.delete("/:googleId", deleteFavoriteController);

module.exports = { favoriteRouter };
