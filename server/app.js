
'use strict';

var fs = require('fs');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var security = {
	key: fs.readFileSync('security/mykey.pem'),
	cert: fs.readFileSync('security/certificate.cer')
};
var server = require('https').createServer(security, app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app; //exports = module.exports = app;