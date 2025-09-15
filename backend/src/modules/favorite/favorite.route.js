const express = require("express")
const favoriteController = require("./favorite.controller")

const router = express.Router()

router.get('/', favoriteController.getAllFavoriteController)
router.get('/:id', favoriteController.getByIdFavoriteController)
router.post('/', favoriteController.toggleFavoriteController)
router.delete('/', favoriteController.toggleFavoriteController)

module.exports = router

// NOTE : Ajeitar a rota
