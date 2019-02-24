const express = require('express');

const router = new express.Router();

const { admin } = require.main.require('./actions');

router.post('/category', (req, res, next) => {
  admin.category.create(req.body)
    .then((category) => res.json({ category }))
    .catch(next);
});

router.patch('/category', (req, res, next) => {
  if (req.body.action == 'rename') {
    admin.category.rename(req.body)
      .then(() => res.json())
      .catch(next);
  } else if (req.body.action == 'move') {
    admin.category.move(req.body)
      .then(() => res.json())
      .catch(next);
  }
});

router.delete('/category/:index', (req, res, next) => {
  admin.category.destroy(req.params)
    .then(() => res.json())
    .catch(next);
});


router.post('/question', (req, res, next) => {
  admin.question.create(req.body)
    .then((question) => res.json({ question }))
    .catch(next);
});

router.patch('/question', (req, res, next) => {
  if (req.body.action == 'rename') {
    admin.question.rename(req.body)
      .then(() => res.json())
      .catch(next);
  } else if (req.body.action == 'move') {
    admin.question.move(req.body)
      .then(() => res.json())
      .catch(next);
  }
});

router.delete('/category/:categoryId/question/:index', (req, res, next) => {
  admin.question.destroy(req.params)
    .then(() => res.json())
    .catch(next);
});


router.post('/answer', (req, res, next) => {
  admin.answer.create(req.body)
    .then((answer) => res.json({ answer }))
    .catch(next);
});

router.patch('/answer', (req, res, next) => {
  if (req.body.action == 'rename') {
    admin.answer.rename(req.body)
      .then(() => res.json())
      .catch(next);
  } else if (req.body.action == 'move') {
    admin.answer.move(req.body)
      .then(() => res.json())
      .catch(next);
  }
});

router.delete('/question/:questionId/answer/:index', (req, res, next) => {
  admin.answer.destroy(req.params)
    .then(() => res.json())
    .catch(next);
});

module.exports = router;