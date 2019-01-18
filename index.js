require('dotenv').config();

const express = require('express');

const { setup, start } = require('./settings');

const app = express();

setup(app);

start(app);