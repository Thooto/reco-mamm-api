const { Router } = require('express');

const router = new Router();

const { user } = require.main.require('./actions');

router.get('/:questionId', (req, res, next) => {
    user.results.get(req.params)
        .then((results) => res.json(results))
        .catch(next);
});

module.exports = router;