const { Router } = require('express');

const router = new Router();

const { admin } = require.main.require('./actions');

router.post('/', (req, res, next) => {
    admin.question.create(req.body)
        .then(() => res.json())
        .catch(next);
});

module.exports = router;