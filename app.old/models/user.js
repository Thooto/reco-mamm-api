const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    visited: {
        type: Sequelize.DATE,
        allowNull: true
    },
    answers: Sequelize.ARRAY(Sequelize.INTEGER)
});