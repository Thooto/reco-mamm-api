require('dotenv').config();

const vhost = require('vhost');
const express = require('express');

const { web, api } = require('./config');
const { start } = require( './utils');

const app = express();
app.listen = require('util').promisify(app.listen);

app
  .use(vhost(web.host, require('./web')))
  .use(vhost(api.host, require('./api')));

start(app);