const answers = require("../../responses.js")
const favoriteService = require('./favorite.service.js')
const logger = require("../../config/logger.js")

exports.getAllFavoriteController = async (req, res) => {
  try {
    logger.info('Resgatando todos os Livros Favoritados...')

    const getFavorite = await favoriteService.getAllFavorite()

    return answers.success(
      res,
      'Todos os livros favoritos resgatados',
      getFavorite
    )
  } catch (error) {
    answers.internalServerError(
      res,
      'Houve um erro ao resgatar os livros favoritos',
      error.message
    )
  }
}

exports.getByIdFavoriteController = async (req, res) => {
  try {
    const { id } = req.params

    logger.info(`Resgatando Livro Favorito de ID ${id}...`)

    const getByIdFavorite = await favoriteService.getFavoriteById(id)

    if (!getByIdFavorite) {
      return answers.notFound(res, 'Não existe um Livro com esse ID')
    }

    return answers.success(res, 'Livro encontrado com sucesso', getByIdFavorite)
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao retornar o Livro de ID específico',
      error.message
    )
  }
}

exports.toggleFavoriteController = async (req, res) => {
  try {
    const { userId, googleId } = req.body

    logger.info('Favoritando Livro...', {
      UserID: userId,
      googleID: googleId
    })

    const checkFavorite = await favoriteService.getFavoriteByUserIdAndGoogleId(userId, googleId)

    if (!checkFavorite) {
      await favoriteService.createFavorite(userId, googleId)
      return answers.created(res, 'Livro adicionado aos favoritos')
    } else {
      await favoriteService.deleteFavorite(checkFavorite.id)
      return answers.success(res, 'Livro removido dos favoritos')
    }
  } catch (error) {
    return answers.internalServerError(
      res,
      'Houve um erro ao realizar operação de favorito',
      error.message
    )
  }
}