const answers = require('../../responses.js')
const favoriteService = require('./favorite.service.js')
const { logger } = require('../../config/logger.js')

exports.getAllFavoriteController = async (req, res) => {
  try {
    logger.info('Resgatando todos os Livros Favoritados...')

    const getFavorite = await favoriteService.getAllFavorite()

    if (getFavorite.length === 0) {
      return answers.notFound(res, 'Não há nenhum Livro nos favoritos')
    }

    return answers.success(res, 'Todos os livros favoritos resgatados', getFavorite)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao resgatar os livros favoritos',
      error.message
    )
  }
}

exports.toggleFavoriteController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId || req.body.userId)
    const googleId = String(req.params.googleId || req.body.googleId)

    if (!userId || !googleId) {
      return answers.badRequest(res, 'É necessário informar userId e googleId.')
    }

    const checkFavorite = await favoriteService.getFavoriteByUserIdAndGoogleId(
      userId,
      googleId
    )

    if (!checkFavorite && userId === req.body.userId && googleId === req.body.googleId) {
      await favoriteService.createFavorite(userId, googleId)
      return answers.created(res, 'Livro adicionado aos favoritos')
    } else if (checkFavorite) {
      await favoriteService.deleteFavorite(userId, googleId)
      return answers.success(res, 'Livro removido dos favoritos')
    } else {
      logger.warn('Este Livro não está nos favoritos')
      answers.badRequest(res, 'Este Livro não está nos favoritos')
    }
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao realizar operação de favorito',
      error.message
    )
  }
}
