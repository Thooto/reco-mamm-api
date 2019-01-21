const { Router } = require('express');

const router = new Router();

router.use('/category', require('./category'));

module.exports = router;