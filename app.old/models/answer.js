const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('answer', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    index: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    explanation: {
        type: Sequelize.TEXT
    }
});