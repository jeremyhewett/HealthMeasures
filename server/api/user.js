
var bodyParser = require('body-parser');
var couch = require('../services/couchService');

exports.middleware = [
	bodyParser.urlencoded({ extended: false }),
	bodyParser.json()
];

exports.create = function(req, res) { //Register
	var credentials = req.body;
	console.log("Register: ", JSON.stringify(credentials));

	var user = {
		name: credentials.username,
		password: credentials.password,
		roles: [],
		type: 'user'
	};

	var userEntity;

	var _users = couch.use('_users');
	_users.insert(user, couch.USER_PREFIX + credentials.username)
		.then(function() {
			return _users.get(couch.USER_PREFIX + credentials.username);
		})
		.then(function(entity) {
			userEntity = entity;
			return couch.request({
				method: 'GET',
				path: '_uuids',
				params: {count: 1}
			});
		})
		.then(function(body) {
			userEntity.database = 'db_' + body.uuids[0];
			return couch.db.create(userEntity.database);
		})
		.then(function(body) {
			console.log('Database ' + userEntity.database + ' created!');
			//Set permissions
			var db = couch.use(userEntity.database);
			var permissions = {
				admins: { names: [], roles: [] },
				members: { names: [credentials.username], roles: [] }
			};
			return db.insert(permissions, '_security');
		})
		.then(function(body) {
			return _users.insert(userEntity);
		})
		.then(function(body) {
			res.json({success: true, username: userEntity.name});
		})
		.catch(function(err) {
			if(userEntity && userEntity.database) {
				try {
					couch.db.destroy(userEntity.database);
				} catch(err) {}
			}
			try {
				_users.destroy(couch.USER_PREFIX + credentials.username, userEntity._rev);
			} catch(err) {}
			res.json({ error: err });
		});
};