const { logInfo, logError, populateDatabase } = require('./');

const { sequelize } = require.main.require('./models');

const config = require.main.require('./config');

module.exports = async (app) => {
  try {
    logInfo(`Starting app in ${config.app.env} mode.`);

    await sequelize.sync({ force: config.app.env == 'dev' ? true : false })

    logInfo('Successful sync with the database!');

    if (config.app.env == 'dev') {
      await populateDatabase();

      logInfo('Database populated.');
    }

    await app.listen(config.app.port);

    logInfo(`Server listening on port ${config.app.port}!`);
  } catch (error) {
    logError(error);
  }
};
