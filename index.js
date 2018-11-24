// Import environment variables
require('dotenv').config();
const config = require('./config');


// App dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


// Setup the app
const app = express();
app.listen = require('util').promisify(app.listen);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(require('./routes'));


// Start the server
app.listen(config.app.port);