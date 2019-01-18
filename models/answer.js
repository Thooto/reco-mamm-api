const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('answer', {
    name: Sequelize.STRING,
    code: Sequelize.STRING,
    next: Sequelize.STRING
});