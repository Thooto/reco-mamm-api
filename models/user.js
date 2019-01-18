const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('user', {
    email: { type: Sequelize.STRING, unique: true }
});