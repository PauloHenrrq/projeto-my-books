const favoriteService = require("./favorite.service.js");
const answers = require("../../utils/responses.js");
const { logger } = require("../../config/logger.js");

const getAllFavoriteController = async (req, res) => {
  try {
    logger.info("Resgatando todos os Livros Favoritados...");
    const userId = parseInt(req.user.id);

    if (!userId) {
      return answers.badRequest(res, "Necessário realizar login");
    }
    const favorites = await favoriteService.getAllFavorite(userId);

    if (favorites.length === 0) {
      return answers.success(res, "Não há nenhum Livro nos favoritos");
    }

    return answers.success(res, "Todos os livros favoritos resgatados", { favorites });
  } catch (error) {
    logger.error(error);
    return answers.internalServerError(
      res,
      "Houve um erro ao resgatar os livros favoritos"
    );
  }
};

const createFavoriteController = async (req, res) => {
  try {
    const googleId = req.params.googleId;
    const userId = parseInt(req.user.id);

    if (!userId || !googleId) {
      return answers.badRequest(res, "Required fields: id, googleId");
    }

    logger.info("Tentando favoritar...", {
      userID: userId,
      googleID: googleId,
    });

    const favorite = await favoriteService.getFavorite(userId, googleId);

    if (favorite) {
      logger.warn(`Livro com googleId: ${googleId} já existe`);
      return answers.badRequest(res, `Livro com googleId: ${googleId} já existe`);
    }
    await favoriteService.createFavorite(userId, googleId);
    return answers.created(res, "Livro adicionado com sucesso");
  } catch (error) {
    logger.error(error);
    return answers.internalServerError(
      res,
      "Houve um erro ao realizar operação de favorito"
    );
  }
};

const deleteFavoriteController = async (req, res) => {
  try {
    const googleId = req.params.googleId;
    const userId = parseInt(req.user.id);

    if (!userId || !googleId) {
      return answers.badRequest(res, "Required fields: id, googleId");
    }

    logger.info("deletando Livro...", {
      userID: userId,
      googleID: googleId,
    });

    const favorite = await favoriteService.getFavorite(userId, googleId);

    if (!favorite) {
      logger.warn(`Livro com googleId: ${googleId} não encontrado`);
      return answers.badRequest(res, `Livro com googleId: ${googleId} não encontrado`);
    }
    await favoriteService.deleteFavorite(userId, googleId);
    return answers.success(res, "Livro removido dos favoritos");
  } catch (error) {
    logger.error(error);
    return answers.internalServerError(
      res,
      "Houve um erro ao realizar operação de favorito"
    );
  }
};

module.exports = {
  getAllFavoriteController,
  deleteFavoriteController,
  createFavoriteController,
};
