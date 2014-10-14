
var config = require('../config/environment');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

exports.all = function(req, res) {
	var cookie = require('cookie').parse(req.headers['cookie']);
	console.log('Proxying: ' + req.method + ' ' + req.originalUrl + ' AuthSession: ' + cookie.AuthSession);
	proxy.web(req, res, { target: 'http://localhost:5984' });
};

proxy.on('error', function (err, req, res) {
	res.status(500);
	res.json({error: err});
});
