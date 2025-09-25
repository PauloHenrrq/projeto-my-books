require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { logger, httpLogger } = require("./config/logger");

const { userRouter } = require("./modules/user/userRoutes");
const { favoriteRouter } = require("./modules/favorite/favorite.route");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowed = ["http://localhost:5173", "http://localhost:3000"];

    if (!origin) return callback(null, true);

    if (allowed.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`not allowed by CORS origin: ${origin}`);
      callback(new Error(`not allowed by CORS origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(httpLogger);

app.use("/api/user", userRouter);
app.use("/api/favorite", favoriteRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
