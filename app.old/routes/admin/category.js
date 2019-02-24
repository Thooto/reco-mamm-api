const { Router } = require('express');

const router = new Router();

const { admin } = require.main.require('./actions');

router.post('/', (req, res, next) => {
    admin.category.create(req.body)
        .then((category) => res.json({ category }))
        .catch(next);
});

router.get('/', (req, res, next) => {
    admin.category.read(req.query)
        .then((category) => res.json(category))
        .catch(next);
});

router.patch('/', (req, res, next) => {
    admin.category.update(req.body)
        .then(() => res.json())
        .catch(next);
});

router.patch('/order', (req, res, next) => {
    admin.category.order(req.body)
        .then(() => res.json())
        .catch(next);
});

router.delete('/:index', (req, res, next) => {
    admin.category.delete(req.params)
        .then((category) => res.json(category))
        .catch(next);
});




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