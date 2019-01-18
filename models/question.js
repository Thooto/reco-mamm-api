const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('question', {
    name: { type: Sequelize.STRING, unique: true }
});
