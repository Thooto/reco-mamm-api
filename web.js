const express = require('express');

const app = express();

app.use(express.static('dist/web'));

app.use('/**', (req, res) => res.sendFile('dist/web/index.html', { root: './' }));

module.exports = app;