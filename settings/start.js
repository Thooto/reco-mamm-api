const { logInfo, logError, populateDatabase } = require.main.require('./utils');

const { sequelize } = require.main.require('./app.old/models');

const config = require('./config');

module.exports = async (app) => {
  try {
    app.listen = require('util').promisify(app.listen);

    logInfo(`Starting app in ${config.app.env} mode.`);

    await sequelize.sync({ force: config.app.env == 'dev' ? true : false });

    logInfo('Successful sync with the database!');

    await app.listen(config.app.port);

    logInfo(`Server listening on port ${config.app.port}!`);

    if (config.app.env == 'dev') {
      await populateDatabase();

      logInfo('Database populated');
    }
  } catch (error) {
    logError(error);
  }
};
