const { Router } = require('express');

const router = new Router();

const { user } = require.main.require('./actions');

router.get('/', (req, res, next) => {
    user.category.get(req.query)
        .then((category) => res.json(category))
        .catch(next);
});

// router.post('/create', (req, res, next) => {
//     user.category.create(req.body)
//         .then(() => res.json())
//         .catch(next);
// });

// router.post('/readOne', (req, res, next) => {
//     admin.category.readOne(req.body)
//         .then((category) => res.json(category))
//         .catch(next);
// });

// router.post('/readAll', (req, res, next) => {
//     admin.category.readAll(req.body)
//         .then((categories) => res.json(categories))
//         .catch(next);
// });

// router.post('/readStructure', (req, res, next) => {})

module.exports = router;