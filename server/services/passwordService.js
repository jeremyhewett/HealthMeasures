var crypto = require('crypto');

var SALT_LENGTH = 128;

var passwordService = {

	hash: function(password) {
		var salt = crypto.randomBytes(SALT_LENGTH).toString('base64');
		var hash = crypto.createHash('md5').update(password + salt).digest('hex');
		return salt + hash;
	},

	isMatch: function(hash, password) {
		var salt = hash.substr(0, SALT_LENGTH);
		var validHash = salt + md5(password + salt);
		return hash === validHash;
	}

};

module.exports = passwordService;