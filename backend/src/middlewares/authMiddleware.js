require("dotenv").config();
const { logger } = require("../config/logger");
const answers = require("../utils/responses");
const { verifyToken } = require("../utils/jwt");

const JWT_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    logger.warn("Authorization token missing");
    return answers.unauthorized(res, "Authorization token is required");
  }
  try {
    const { id, email } = verifyToken(token, JWT_KEY);
    req.user = { id, email };
    logger.info(`User authorized | id:${id} | email:${email}`);

    next();
  } catch (error) {
    logger.error(error);

    answers.unauthorized(res, "Invalid or expired token");
  }
};

module.exports = { authMiddleware };
