require('dotenv').config();

const vhost = require('vhost');
const express = require('express');

const { web, api, admin } = require('./config');
const { start } = require( './utils');

const app = express();
app.listen = require('util').promisify(app.listen);

app
  .use(vhost(web.host, require('./web')))
  .use(vhost(admin.host, require('./admin')))
  .use(vhost(api.host, require('./api')));

start(app);