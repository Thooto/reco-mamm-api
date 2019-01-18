// Router dependencies
const express = require('express');
const { categories, questions, answers, authenticate } = require.main.require('./actions');

// Define the router
const router = new express.Router();


// Register admin route
router.route('/register')
    .post((req, res, next) => {
        authenticate.register(req.body)
            .then(() => res.json())
            .catch(next);
    });


// Login route
router.route('/login')
    .post((req, res, next) => {
        authenticate.login(req.body)
            .then((token) => res.json(token))
            .catch(next);
    });


// Category CRUD
router.route('/categories')
    .post((req, res, next) => {
        categories.create(req.body)
            .then((category) => res.json(category))
            .catch(next);
    })
    .get((req, res, next) => {
        categories.read(req.query)
            .then((category) => res.json(category))
            .catch(next);
    });


// Questions CRUD
router.route('/questions')
    .post((req, res, next) => {
        questions.create(req.body)
            .then((question) => res.json(question))
            .catch(next);
    })
    .get((req, res, next) => {
        questions.read(req.query)
            .then((question) => res.json(question))
            .catch(next);
    });


// Answers CRUD
router.route('/answers')
    .post((req, res, next) => {
        answers.create(req.body)
            .then((question) => res.json(question))
            .catch(next);
    })
    .get((req, res, next) => {
        answers.read(req.query)
            .then((question) => res.json(question))
            .catch(next);
    });

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

router.get('**', (req, res) => res.sendStatus(404));

module.exports = router;


/*

const express = require('express');

const router = new express.Router();

const { logError } = require.main.require('./utils');

router.get('/', (req, res) => res.send('Expercancer API.'));

router.use('/admin', require('./admin'));
router.use('/user', require('./user'));


router.use((err, req, res, next) => {
    logError(err);
    res.status(500).send(err.message);
});

module.exports = router;

*/