
var passwordService = require('../services/passwordService');
var userService = require('../services/userService');

exports.post = function(req, res) { //Register
	var user = req.body;
	console.log("User: ", JSON.stringify(user));
	var hash = passwordService.hash(user.password);
	user.password = hash;
	userService.insert(user, function(err, dbUser) {
		if(err) {
			if(err.code == 11000) { //Duplicate key
				res.status(400);
				res.json({
					error: err,
					message: "A user with this email already exists"
				});
			}
		} else {
			dbUser.password = "";
			res.status(200);
			res.json(dbUser);
		}
	});
};

exports.show = function(req, res) { //Login
	var user = req.body;

	if(user.email.length == 0 || user.password.length == 0) {
		res.status(403);
		res.json({ error: "Invalid Credentials" });
	}

	userService.findOne({ email: user.email }, function(err, dbUser) {

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