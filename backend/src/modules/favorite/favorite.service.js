const prisma = require('../../config/prisma.js')
const logger = require('../../config/logger.js')

const getAllFavorite = async () => {
  try {
    const favorites = await prisma.favorite.findMany()
    logger.info('Livros favoritos carregados com sucesso', {
      count: favorites.length
    })
    return favorites
  } catch (error) {
    logger.error('Houve um erro ao carregar os livros favoritos', {
      error: error.message
    })
    throw error
  }
}

const getFavoriteByUserIdAndGoogleId = async (userId, googleId) => {
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_googleId: {
          userId: userId,
          googleId: googleId
        }
      }
    })

    if (!favorite) {
      logger.warn(`Livro de ID ${googleId} não encontrado`)
      return null
    }

    logger.info(`Livro de ID ${googleId} encontrado com sucesso.`)
    return favorite
  } catch (error) {
    logger.error(`Houve um erro ao encontrar o Livro de ID ${googleId}`, {
      error: error.message
    })
    throw error
  }
}

const createFavorite = async (userId, googleId) => {
  try {
    if (!userId || !googleId) {
      logger.warn('Informações necessárias não fornecidas')
      return null
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: userId,
        googleId: googleId
      }
    })

    logger.info('Livro favoritado com sucesso!', {
      Book: googleId
    })
    return favorite
  } catch (error) {
    logger.error('Houve um erro ao inserir o Livro aos Favoritos', {
      error: error.message
    })
    throw error
  }
}

const deleteFavorite = async id => {
  const bookInfo = await prisma.favorite.findUnique({
    where: {
      id: id
    }
  })

  try {
    if (!bookInfo) {
      logger.warn('Livro não está nos favoritos.')
      return null
    }

    const favorite = await prisma.favorite.delete({
      where: {
        id: id
      }
    })

    logger.info('Livro removido com sucesso da lista de favoritos.', {
      Book: bookInfo.googleId
    })
    return favorite
  } catch (error) {
    logger.error(`Houve um problema ao deletar o livro ${bookInfo.googleId}`, {
      error: error.message
    })
    throw error
  }
}

module.exports = {
  getAllFavorite,
  getFavoriteByUserIdAndGoogleId,
  createFavorite,
  deleteFavorite
}
