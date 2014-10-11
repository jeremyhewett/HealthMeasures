
var _ = require('lodash');
var Q = require('q');
var config = require('../config/environment');
var nano = require('nano')(config.couchdb.url);

function denodeify(f) {
	var inner = Q.denodeify(f);
	return function() {
		var deferred = Q.defer();
		inner.apply(this, arguments).then(function(res) {
			deferred.resolve(_.isArray(res) ? res[0] : res);
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

	request: denodeify(nano.request),

	USER_PREFIX: 'org.couchdb.user:'

};
