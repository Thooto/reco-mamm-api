const Sequelize = require('sequelize');

const { sequelize } = require('./');

module.exports = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    visitDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    identifier: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    answers: Sequelize.ARRAY(Sequelize.INTEGER)
}, {
    timestamps: false
});