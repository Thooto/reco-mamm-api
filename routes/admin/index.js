const { Router } = require('express');

const { checkAdmin } = require.main.require('./utils');

const router = new Router();

router.use('/category', checkAdmin, require('./category'));

router.use('/login', require('./login'));

module.exports = router;