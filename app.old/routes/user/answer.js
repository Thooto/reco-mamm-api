const { Router } = require('express');

const router = new Router();

const { user } = require.main.require('./actions');

router.post('/', (req, res, next) => {
    user.answer.create(req.body)
        .then(() => res.json())
        .catch(next);
});

module.exports = router;