require('dotenv').config();

const express = require('express');
const app = express();

const { setup, start } = require('./settings');

setup(app);
start(app);