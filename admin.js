const express = require('express');

const app = express();

app.use(express.static('dist/admin'));

app.use('/**', (req, res) => res.sendFile('dist/admin/index.html', { root: './' }));

module.exports = app;