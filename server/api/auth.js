
var nano = require('nano')('http://jeremy:password@localhost:5984');
var cookieModule = require('cookie');
var couch = require('../services/couch');

exports.create = function(req, res) { //Login

	var credentials = req.body;

	nano.use('_users').get(couch.USERNAME_PREFIX + credentials.username, function(err, entity) {
		var userEntity = entity;
		nano.auth(credentials.username, credentials.password, function(err, body, headers) {
			if(err) {
				res.json({ error: err});
			} else {
				if(headers && headers['set-cookie']) {
					var cookie = cookieModule.parse(headers['set-cookie'][0]);
					res.json({user: {
						username: userEntity.name,
						database: userEntity.database,
						token: cookie.AuthSession
					}});
				} else {
					res.json({ error: 'Failed to authenticate user: ' + credentials.username});
				}
			}
		});
	});

};
