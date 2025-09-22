const prisma = require('../../config/prisma.js')
const { logger } = require('../../config/logger.js')

const getAllFavorite = async () => {
  try {
    const favorites = await prisma.favorite.findMany()

    !!favorites
      ? logger.warn('Nenhum Livro encontrado nos favoritos', favorites)
      : logger.info('Livros favoritos carregados com sucesso', {
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

const createFavorite = async (userId, googleId) => {
  try {
    if (!userId || !googleId) {
      logger.warn('Informações necessárias não fornecidas')
      return null
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: Number(userId),
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

const deleteFavorite = async (userId, googleId) => {
  const bookInfo = await prisma.favorite.findUnique({
    where: {
      userId_googleId: {
        userId: Number(userId),
        googleId: googleId
      }
    }
  })

  try {
    if (!bookInfo) {
      logger.warn('Este Livro não está nos favoritos.')
      return null
    }

    const favorite = await prisma.favorite.delete({
      where: {
        id: bookInfo.id
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
  createFavorite,
  deleteFavorite
}
