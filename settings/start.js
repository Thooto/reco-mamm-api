const { logInfo, logError } = require.main.require('./utils');

const { sequelize } = require.main.require('./models');

const config = require('./config');

module.exports = (app) => {
    logInfo(`Starting app in ${config.app.env} mode.`);

    sequelize.sync()
        .then(() => {
            logInfo('Successful sync with the database!');

            app.listen(config.app.port, () => logInfo(`Server listening on port ${config.app.port}!`));
        })
        .catch(logError);
};