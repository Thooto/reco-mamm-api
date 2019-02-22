const jwt = require('jsonwebtoken');
const { logError } = require('./log');
const { config } = require.main.require('./settings');


const checkUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) throw Error('Header not provided');

        const token = header.split(' ')[1];

        req.token = await jwt.verify(token, config.app.secret);

        next();
    } catch (error) {
        logError(error);
        res.status(500).json(error);
    }
};

module.exports.checkUser = checkUser;

module.exports.checkAdmin = (req, res, next) => {
    checkUser(req, res, () => {
        try {
            if (!req.token.adminId) throw Error('Unauthorized');

            next();
        } catch (error) {
            logError(error);
            res.status(500).json(error);
        }
    });
};