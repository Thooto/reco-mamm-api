const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const config = require.main.require('./config');

const { sequelize } = require('./');

const Admin = sequelize.define('admin', {
    email: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING
}, {
    timestamps: false
});

Admin.beforeCreate(async (admin) => {
    const hash = await bcrypt.hash(admin.password, config.app.saltRounds);
    admin.password = hash;
});

module.exports = Admin;