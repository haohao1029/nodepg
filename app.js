const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.options('*', cors())
// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./src/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
