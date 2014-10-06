
var config = require('../config/environment');
var nano = require('nano')(config.couchdb.url);
var couch = require('../services/couch');

exports.create = function(req, res) { //Register
	var credentials = req.body;
	console.log("Register: ", JSON.stringify(credentials));

	var _users = nano.use('_users');

	var user = {
		name: credentials.username,
		password: credentials.password,
		roles: [],
		type: 'user'
	};

	_users.insert(user, couch.USERNAME_PREFIX + credentials.username, function(err, body) {
		if(err) {
			res.json({ error: err });
		} else {
			_users.get(couch.USERNAME_PREFIX + credentials.username, function(err, userEntity) {
				nano.request({
					method: 'GET',
					path: '_uuids',
					params: {count: 1}
				}, function(err, body) {
					userEntity.database = 'db_' + body.uuids[0];
					nano.db.create(userEntity.database, function(err, body) {
						if(err) {
							_users.destroy(couch.USERNAME_PREFIX + credentials.username, userEntity._rev, function(err, body) {
								res.json({ error: err });
							});
						} else {
							console.log('Database ' + userEntity.database + ' created!');
							//Set permissions
							var db = nano.use(userEntity.database);
							var permissions = {
								admins: { names: [], roles: [] },
								members: { names: [credentials.username], roles: [] }
							};
							db.insert(permissions, '_security', function(err, body) {
								if(err) {
									nano.db.destroy(userEntity.database, function(err, body) {
										_users.destroy(couch.USERNAME_PREFIX + credentials.username, userEntity._rev, function(err, body) {
											res.json({ error: err });
										});
									});
								} else {
									//Link user to database
									_users.insert(userEntity, function(err, body) {
										if(err) {
											nano.db.destroy(userEntity.database, function(err, body) {
												_users.destroy(couch.USERNAME_PREFIX + credentials.username, userEntity._rev, function(err, body) {
													res.json({ error: err });
												});
											});
										} else {
											res.json({success: true, username: userEntity.name});
										}
									});
								}
							});
						}
					});
				});
			});
		}
	});
};