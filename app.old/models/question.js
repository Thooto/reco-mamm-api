const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('question', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    index: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
