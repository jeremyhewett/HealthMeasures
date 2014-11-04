angular.module('HealthMeasures.backend')

	.factory('Api', function($http, $q, Certificate, Config) {

		function wrapHttp(f) {
			return function() {
				arguments[0] = Config.server + '/api/' + arguments[0];
				var args = arguments;
				var deferred = $q.defer();
				Certificate.check().then(function() {
					f.apply(null, args).success(function(response) {
						deferred.resolve(response);
					}).error(function(error) {
						deferred.reject(error);
					});
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			}
		}

		return {
			get: wrapHttp($http.get),
			post: wrapHttp($http.post),
			put: wrapHttp($http.put),
			delete: wrapHttp($http.delete),

			syncDb: function(database) {
				var deferred = $q.defer();
				Certificate.check().then(function() {
					PouchDB.sync(Config.server + '/api/db/' + database, database)
						.on('complete', function(info) {
							console.log('CouchDB sync complete.');
							deferred.resolve();
						}).on('uptodate', function(info) {
							console.log('CouchDB sync uptodate.');
						}).on('error', function (err) {
							console.log('CouchDB sync error: ' + err);
							deferred.reject(err);
						});
				}).catch(function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			}
		};

	});