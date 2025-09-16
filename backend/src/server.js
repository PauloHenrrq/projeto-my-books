require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { logger, httpLogger } = require("./config/logger");

const { userRouter } = require("./modules/user/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.get("/", (req, res) => {
  // logger.info("Rota principal acessada");
  res.send("Olá, mundo!");
});

app.use("/api", userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
