const { Router } = require('express');

const router = new Router();

const { admin } = require.main.require('./actions');

router.post('/', (req, res, next) => {
    admin.login(req.body)
        .then((token) => res.json(token))
        .catch(next);
});

module.exports = router;