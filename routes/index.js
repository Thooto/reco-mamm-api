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


// Error interceptor
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});


// 404 interceptor
router.get('**', (req, res) => res.sendStatus(404));


// Export the router
module.exports = router;