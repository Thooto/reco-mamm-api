const chalk = require('chalk');

module.exports.logSuccess = (message) => console.log(chalk.green('Success:'), message);

module.exports.logInfo = (message) => console.log(chalk.blue('Info:'), message);

module.exports.logError = (error) => console.error(chalk.red('Error:'), error.message);

module.exports.logWarning = (warning) => console.warn(chalk.yellow('Warning:'), warning);