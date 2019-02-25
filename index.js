require('dotenv').config();
global.config = require('./config');

const vhost = require('vhost');
const express = require('express');

const { start } = require('./utils');

const app = express();
app.listen = require('util').promisify(app.listen);

app
  .use(vhost(config.hosts.web, require('./web')))
  .use(vhost(config.hosts.admin, require('./admin')))
  .use(vhost(config.hosts.api, require('./api')));

start(app);