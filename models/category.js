const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('category', {
    index: { type: Sequelize.INTEGER, unique: true },
    name: { type: Sequelize.STRING, unique: true }
});