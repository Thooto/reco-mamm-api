const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
jwt.sign = require('util').promisify(jwt.sign);

const { Admin } = require.main.require('./models');

const config = require.main.require('./config');

module.exports = async ({ email, password }) => {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) throw Error('Admin not found');

    const match = await bcrypt.compare(password, admin.password);

    if (!match) throw Error('Wrong password');

    return await jwt.sign({ id: admin.id, admin: true }, config.app.secret, { expiresIn: config.app.tokenExpiration });
};
