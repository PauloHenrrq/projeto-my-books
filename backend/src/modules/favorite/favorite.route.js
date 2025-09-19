const express = require("express")
const favoriteController = require("./favorite.controller")

const router = express.Router()

router.get('/favorite', favoriteController.getAllFavoriteController)
router.post('/favorite', favoriteController.toggleFavoriteController)
router.delete('/favorite/:userId/:googleId', favoriteController.toggleFavoriteController)

module.exports = router
