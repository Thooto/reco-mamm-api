const { logInfo, logError, populateDatabase } = require.main.require('./utils');

const { sequelize } = require.main.require('./models');

const config = require('./config');

module.exports = (app) => {
    logInfo(`Starting app in ${config.app.env} mode.`);

    sequelize.sync({ force: config.app.env == 'dev' ? true : false })
        .then(() => {
            logInfo('Successful sync with the database!');

            app.listen(config.app.port, () => {
                logInfo(`Server listening on port ${config.app.port}!`);

                if (config.app.env == 'dev') {
                    populateDatabase()
                        .then(() => logInfo('Database populated'))
                        .catch(logError);
                }
            });
        })
        .catch(logError);
};