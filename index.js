require('dotenv').config();

const express = require('express');
const vhost = require('vhost');


const { sequelize } = require('./app.old/models');
const { config } = require('./settings');
const { logInfo, logError, populateDatabase } = require('./utils');


const app = express();
app.listen = require('util').promisify(app.listen);


(async (app) => {
  try {
    logInfo(`Starting app in ${config.app.env} mode.`);
    
    await sequelize.sync({ force: config.app.env == 'dev' ? true : false })

    logInfo('Successful sync with the database!');

    if (config.app.env == 'dev') {
      await populateDatabase();

      logInfo('Database populated.');
    }

    app
      .use(vhost(config.web.host, require('./web')))
      .use(vhost(config.api.host, require('./api')));
    
    await app.listen(config.app.port);

    logInfo(`Server listening on port ${config.app.port}!`);
  } catch (error) {
    logError(error);
  }
})(app);
