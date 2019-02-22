const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('category', {
    index: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});