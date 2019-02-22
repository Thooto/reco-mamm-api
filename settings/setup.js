const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');

// module.exports = (app) => {
//   if (config.app.env == 'dev') app.use(cors());

//   app.use(express.json());
//   app.use(morgan(config.app.env));

//   app.use(express.static('dist'));

//   app.use('/api', require.main.require('./routes'));

//   app.use('/**', (req, res) => res.sendFile('dist/index.html', { root: './' }));
// };

module.exports = (app) => {
  if (config.app.env == 'dev') app.use(cors());

  app.use(express.json());
  app.use(morgan(config.app.env));
};