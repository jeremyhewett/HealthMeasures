var passwordService = require('../services/passwordService');
var userService = require('../services/userService');
var restService = require('../services/restService');

module.exports = function(server) {

	server.post('/api/user/register', function(req, res, next) {
		var user = req.body;
		console.log("User: ", JSON.stringify(user));
		var hash = passwordService.hash(user.password);
		user.password = hash;
		userService.insert(user, function(err, dbUser) {
			if(err) {
				if(err.code == 11000) { //Duplicate key
					restService.send(res, 400, {
						error: err,
						message: "A user with this email already exists"
					});
				}
			} else {
				dbUser.password = "";
				restService.send(res, 200, dbUser);
			}
			next();
		});
	});

	server.post('/api/user/login', function(req, res, next) {
		var user = req.body;

		if(user.email.length == 0 || user.password.length == 0) {
			restService.send(res, 403, {
				error: "Invalid Credentials"
			});
			next();
		}

		userService.findOne({ email: user.email }, function(err, dbUser) {
			var isMatch = passwordService.isMatch(user.password, dbUser.password);

			if(isMatch) {
				dbUser.password = "";
				restService.send(res, 400, dbUser);
			} else {
				restService.send(res, 403, {
					error: "Invalid User"
				});
			}
			next();
		});
	});
};
