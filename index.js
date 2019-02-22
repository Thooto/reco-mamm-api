require('dotenv').config();

const express = require('express');
const vhost = require('vhost');
const cors = require('cors');
const morgan = require('morgan');

const { config } = require('./settings');

function setup(app) {
  if (config.app.env == 'dev') app.use(cors());

  app.use(express.json());
  app.use(morgan(config.app.env));
}

function start(app) {
  return app.listen(config.app.port, () => {
    console.log(`App listening on port ${config.app.port}`);
  });
}

const app = express();

app
  .use(vhost(config.web.host, require('./web')))
  .use(vhost(config.api.host, require('./api')))

setup(app);
start(app);