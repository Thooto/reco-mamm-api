const express = require('express');

const router = new express.Router();

const { login } = require.main.require('./actions');

router.post('/', (req, res, next) => {
  login(req.body)
    .then(token => res.json({ token }))
    .catch(next)
});

module.exports = router;