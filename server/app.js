/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('YKLRzeKZPsiRwzuFQEOhVjhzjegKwt4XwQMfmlNoQIdyKq2yCOXxPilqJk68fCkk', 'base64'),
  audience: 'ss1LUewERah4koBlA7VCNtZqgb4gbnTk'
});

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

app.use('/*', jwtCheck)

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;