const jwt = require('jsonwebtoken');
const { logError } = require('./log');
const config = require.main.require('./config');


const checkHeaders = async (req, res, next) => {
    try {
        const headers = req.headers.authorization;

        if (!headers) throw Error('Headers not provided');

        const token = headers.split(' ')[1];

        req.token = await jwt.verify(token, config.app.secret);

        next();
    } catch (error) {
        logError(error);
        res.status(500).json(error);
    }
};

module.exports.checkHeaders = checkHeaders;

module.exports.checkAdmin = (req, res, next) => {
    checkHeaders(req, res, () => {
        try {
            if (!req.token.admin) throw Error('Unauthorized');

            next();
        } catch (error) {
            logError(error);
            res.status(500).json(error);
        }
    });
};