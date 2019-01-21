const { Router } = require('express');

const router = new Router();

const { user } = require.main.require('./actions');

router.get('/', (req, res, next) => {
    user.form.get()
        .then((form) => res.json(form))
        .catch(next);
});

module.exports = router;