require("dotenv").config();
const pino = require("pino");
const pinoHttp = require("pino-http");

const logger = pino({
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid, hostname",
            translateTime: "yyyy-mm-dd HH:mm:ss",
            messageFormart: "{req.method} {req.url} = {msg}",
          },
        }
      : undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
});

const httpLogger = pinoHttp({ logger });

module.exports = { logger, httpLogger };
