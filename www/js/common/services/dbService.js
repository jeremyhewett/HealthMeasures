angular.module('HealthMeasures.common')

	.factory('Database', function($q, User) {

		var db;

		function filter(criteria, sort) {
			return function(doc, emit) {
				var match = true;
				angular.forEach(criteria, function(value, key) {
					if(doc[key] !== value) {
						match = false;
					}
				});
				if(match) {
					var key = doc.id;
					if(sort) {
						key = [];
						sort.forEach(function(field) {
							key.push(doc[field]);
						});
					}
					emit(key, doc);
				}
			};
		}

		var databaseService = {

			initialize: function() {
				db = new PouchDB(User.registeredUser().id);
			},

			get: function(id) {
				var deferred = $q.defer();
				db.get(id).then(function(doc) {
					deferred.resolve(doc);
				}).catch(function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			},

			search: function(criteria, sort) {
				var deferred = $q.defer();
				db.query(filter(criteria, sort)).then(function(response) {
					deferred.resolve(response.rows.map(function(row) {
						return row.value;
					}));
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			},

			put: function(doc) {
				var deferred = $q.defer();
				var promise = doc._id ? db.put(doc) : db.post(doc);
				promise.then(function(doc) {
					db.get(doc.id).then(function(doc) {
						deferred.resolve(doc);
					}).catch(function(error){
						deferred.reject(error);
					});
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			},

			'delete': function(doc) {
				var deferred = $q.defer();
				db.get(doc._id).then(function(doc) {
					db.remove(doc).then(function(doc) {
						deferred.resolve(doc);
					}).catch(function(error) {
						deferred.reject(error);
					});
				}).catch(function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			}

		};

		databaseService.initialize();

		return databaseService;

	});