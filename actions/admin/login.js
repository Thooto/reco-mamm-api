const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
jwt.sign = require('util').promisify(jwt.sign);

const { Admin } = require.main.require('./models');

const { config } = require.main.require('./settings');

module.exports = async (body) => {
    const admin = await Admin.findOne({ where: { email: body.email } });

    if (!admin) throw Error('Admin not found');

    const matches = await bcrypt.compare(body.password, admin.password);

    if (!matches) throw Error('Wrong password');

    return await jwt.sign({ adminId: admin.id }, config.app.secret, { expiresIn: '1h' });
};
