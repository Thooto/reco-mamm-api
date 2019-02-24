const express = require('express');
const morgan = require('morgan');

const config = require.main.require('./config');

const app = express();

if (config.app.env == 'dev') app.use(require('cors')());

app
  .use(express.json())
  .use(morgan(config.app.env))
  .use('/', require('./routes'));

module.exports = app;