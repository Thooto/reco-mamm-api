const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { config } = require.main.require('./settings');

const app = express();

if (config.app.env == 'dev') app.use(cors());

app
  .use(express.json())
  .use(morgan(config.app.env))
  .use('/**', (req, res) => res.sendStatus(404));

module.exports = app;