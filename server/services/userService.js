
//var mongojs = require('mongojs');
//var db = mongojs('healthMeasures', ['users']);

//db.users.ensureIndex({ email: 1 }, { unique: true });

var userService = {
	insert: function(user, callback) {
		return '';//db.users.insert(user, callback);
	},
	findOne: function(searchObject, callback) {
		return '';//db.users.findOne(searchObject, callback);
	}
};

module.exports = userService;