const { logger } = require("../../config/logger");
const userService = require("./userService");

const registerUserController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!email || !userName || !password) {
      return res.status(400).json({
        error: "Required fields: username, email and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    const user = await userService.register(userName, email, password);

    logger.info(user, "User registered successfully");
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    logger.error(error);
    const statusCode = error.statusCode ?? 500;
    res.status(statusCode).json({
      error: statusCode === 500 ? "Server internal error" : error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Required fields: email and password",
      });
    }

    const user = await userService.login(email, password);

    logger.info(user, "Login successful");
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    logger.error(error);

    const statusCode = error.statusCode ?? 500;
    res.status(statusCode).json({
      error: statusCode === 500 ? "Server internal error" : error.message,
    });
  }
};

module.exports = { registerUserController, loginUserController };
