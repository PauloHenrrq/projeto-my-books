require("dotenv").config();
const prisma = require("../../config/prisma");
const { logger } = require("../../config/logger");
const { hashPassword, comparePassword } = require("../../utils/passwordHash");
const HttpError = require("../../utils/HttpError");
const { generateToken } = require("../../utils/jwt");

const JWT_KEY = process.env.JWT_SECRET;
if (!JWT_KEY) {
  logger.error("Chave JWT SECRET não foi carregada corretamente");
  throw new Error("JWT SECRET não carregada!");
}

const register = async (userName, email, password) => {
  try {
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) {
      throw new HttpError("User already registered", 400);
    }

    hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken({ id: newUser.id, email: newUser.email }, JWT_KEY);

    const { password: _, ...data } = newUser;

    return { data, token };
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpError("Invalid email or password", 400);
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      throw new HttpError("Invalid email or password", 400);
    }

    const token = generateToken({ id: user.id, email: user.email }, JWT_KEY);

    const { password: _, ...data } = user;

    return { data, token };
  } catch (error) {
    throw error;
  }
};
module.exports = { register, login };
