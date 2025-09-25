const { prisma } = require("../../config/prisma.js");
const { logger } = require("../../config/logger.js");

const getAllFavorite = async (userId) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
    });

    if (favorites.length === 0) {
      logger.warn("Nenhum Livro encontrado nos favoritos");
    } else {
      logger.info("Livros favoritos carregados com sucesso", {
        count: favorites.length,
      });
    }

    return favorites;
  } catch (error) {
    throw error;
  }
};

const getFavorite = async (userId, googleId) => {
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_googleId: {
          userId,
          googleId,
        },
      },
    });

    if (favorite) {
      logger.info(`book ID found :${favorite.id}`);
    } else {
      logger.warn("book not found");
    }
    return favorite;
  } catch (error) {
    throw error;
  }
};

const createFavorite = async (userId, googleId) => {
  try {
    await prisma.favorite.create({
      data: {
        userId,
        googleId,
      },
    });

    logger.info("Livro favoritado com sucesso!", {
      Book: googleId,
    });
  } catch (error) {
    throw error;
  }
};

const deleteFavorite = async (userId, googleId) => {
  try {
    const favorite = await prisma.favorite.delete({
      where: {
        userId_googleId: {
          userId: userId,
          googleId: googleId,
        },
      },
    });

    logger.info(
      `Livro removido com sucesso da lista de favoritos.  GoogleId: ${favorite.googleId} , userId : ${favorite.userId}`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllFavorite,
  getFavorite,
  createFavorite,
  deleteFavorite,
};
