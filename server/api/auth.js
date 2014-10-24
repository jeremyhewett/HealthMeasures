
var bodyParser = require('body-parser');
var cookieModule = require('cookie');
var couch = require('../services/couchService');

exports.middleware = [
	bodyParser.urlencoded({ extended: false }),
	bodyParser.json()
];

exports.create = function(req, res) { //Login

	var credentials = req.body,
		userEntity;

	couch.use('_users').get(couch.USER_PREFIX + credentials.username).then(function(entity) {
		userEntity = entity;
		return couch.auth(credentials.username, credentials.password);
	}).then(function(headers) {
		if(headers && headers['set-cookie']) {
			var cookie = cookieModule.parse(headers['set-cookie'][0]);
			res.json({user: {
				username: userEntity.name,
				database: userEntity.database,
				cookie: {'AuthSession': cookie['AuthSession']}
			}});
		} else {
			res.status(401);
			res.json({ error: 'Failed to authenticate user: ' + credentials.username});
		}
	}).catch(function(err) {
		res.status(500);
		res.json({ error: err});
	});

};
