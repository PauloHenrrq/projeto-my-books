require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { logger, httpLogger } = require("./config/logger");

const { userRouter } = require("./modules/user/userRoutes");
const { favoriteRouter } = require("./modules/favorite/favorite.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use("/api/user", userRouter);
app.use("/api/favorite", favoriteRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
