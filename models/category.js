const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('category', {
    name: { type: Sequelize.STRING, unique: true }
});