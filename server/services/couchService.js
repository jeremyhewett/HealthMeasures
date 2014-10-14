
var _ = require('lodash');
var Q = require('q');
var config = require('../config/environment');
var nano = require('nano')(config.couchdb.url);

function denodeify(f, index) {
	index = index || 0;
	var inner = Q.denodeify(f);
	return function() {
		var deferred = Q.defer();
		inner.apply(null, arguments).then(function(res) {
			deferred.resolve(res[index]);
		}).catch(function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}
}

module.exports = {

	db: {
		create: denodeify(nano.db.create),
		get: denodeify(nano.db.get),
		destroy: denodeify(nano.db.destroy)
	},

	use: function(database) {
		var _db = nano.use(database);
		return {
			insert: denodeify(_db.insert),
			destroy: denodeify(_db.destroy),
			get: denodeify(_db.get)
		}
	},

	auth: denodeify(nano.auth, 1),
	request: denodeify(nano.request),

	USER_PREFIX: 'org.couchdb.user:'

};
