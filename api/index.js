const express = require('express');

const app = express();

app.post('/', (req, res) => res.json(req.body));
app.get('/', (req, res) => res.send('Ya'));

module.exports = app;