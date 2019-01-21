const { Router } = require('express');

const router = new Router();

router.use('/category', require('./category'));
router.use('/form', require('./form'));

module.exports = router;