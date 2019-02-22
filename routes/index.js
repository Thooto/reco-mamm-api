const express = require('express');

const { logError, checkAdmin } = require.main.require('./utils');

const router = new express.Router();

const { readForm, createAnswers } = require.main.require('./actions');

router
  .get('/form', (req, res, next) => {
    readForm()
      .then((form) => res.json(form))
      .catch(next);
  })

  .post('/answers', (req, res, next) => {
    createAnswers(req.body)
      .then((user) => res.json(user))
      .catch(next);
  })

  .use('/login', require('./login'))
  // .use('/user', require('./user'))
  .use('/admin', checkAdmin, require('./admin'))

  .use('/**', (req, res) => res.status(404).json())

  .use((err, req, res, next) => {
    logError(err);
    res.status(500).json(err);
  });

module.exports = router;