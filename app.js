const Hapi = require("@hapi/hapi");
const logger = require("./utils/logger");
const authStrategy = require("./utils/authStrategies");
const registeredPlugins = require("./utils/registeredPlugins");
const registeredBaseRoutes = require("./utils/registeredBaseRoutes");
require("dotenv").config();

async function startServer({ services } = {}) {
  try {
    const server = new Hapi.Server({
      port: process.env.Port,
      host: "localhost",
    });
    server.app.services = services;
    await registeredPlugins(server);
    authStrategy(server);
    registeredBaseRoutes(server);
    await server.start();
    logger.log({
      level: "info",
      message: `%s %s server is running on ${server.info.port}....`,
    });
    return server;
  } catch (error) {
    logger.log({
      level: "error",
      message: error,
    });
    return null;
  }
}

module.exports = { startServer };
