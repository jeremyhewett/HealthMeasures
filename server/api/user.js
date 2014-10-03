
var USERNAME_PREFIX = 'org.couchdb.user:';

var passwordService = require('../services/passwordService');
var userService = require('../services/userService');

var nano = require('nano')('http://jeremy:password@localhost:5984');
var cookieModule = require('cookie');

exports.create = function(req, res) { //Register
	var credentials = req.body;
	console.log("User: ", JSON.stringify(credentials));

	var _users = nano.use('_users');

	_users.get(USERNAME_PREFIX + credentials.username, function(err, body) {
		if(err && err.status_code === 404) {
			var user = {
				name: credentials.username,
				password: credentials.password,
				roles: [],
				type: 'user'
			};

			_users.insert(user, USERNAME_PREFIX + credentials.username, function(err, body) {
				if(err) {

				} else {
					nano.db.create(credentials.username, function(err, body) {
						if (!err) {
							console.log('Database ' + credentials.username + ' created!');
							//Set permissions
							var userDb = nano.use(credentials.username);
							var permissions = {
								admins: { names: [], roles: [] },
								members: { names: [credentials.username], roles: [] }
							};
							userDb.insert(permissions, '_security', function(err, body) {
								if(err) {

									//Todo: delete database and _user entry

									res.json({
										error: 'Failed to secure database',
										message: 'Failed to secure database'
									});

								} else {
									//Retrieve cookie
									nano.auth(credentials.username, credentials.password, function(err, body, headers) {
										if(err || !(headers && headers['set-cookie'])) {
											res.json({
												error: 'Failed to get authorization cookie',
												message: 'Failed to get authorization cookie'
											});
										} else {
											var cookie = cookieModule.parse(headers['set-cookie'][0]);
											res.cookie('AuthSession', cookie.AuthSession);
											res.json({success: true});
										}
									});
								}
							});
						} else {

							//Todo: delete _user entry

							res.json({
								error: 'Failed to create database',
								message: 'Failed to create database'
							});
						}
					});

				}
			});

		} else {
			res.json({
				error: 'Exists',
				message: "A user with this email already exists."
			});
		}
	});



//	var hash = passwordService.hash(user.password);
//	user.password = hash;
//	userService.insert(user, function(err, dbUser) {
//		if(err) {
//			if(err.code == 11000) { //Duplicate key
//				res.status(400);
//				res.json({
//					error: err,
//					message: "A user with this email already exists"
//				});
//			}
//		} else {
//			dbUser.password = "";
//			res.status(200);
//			res.json(dbUser);
//		}
//	});
};

exports.show = function(req, res) { //Login
	var user = req.body;

	if(user.username.length == 0 || user.password.length == 0) {
		res.status(403);
		res.json({ error: "Invalid Credentials" });
	}

	userService.findOne({ username: user.username}, function(err, dbUser) {

		var isMatch = passwordService.isMatch(user.password, dbUser.password);

		if(isMatch) {
			dbUser.password = "";
			res.status(400);
			res.json(dbUser);
		} else {
			res.status(403);
			res.json({ error: "Invalid User" });
		}

	});
};