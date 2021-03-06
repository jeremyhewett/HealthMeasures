angular.module('HealthMeasures.common')

	.factory('Database', function(ipCookie, $q, $rootScope, Api, AsyncCallManager, Config, User) {

		var db;

		var sync = AsyncCallManager.queueOverlappingCallsTo(function() {
			var deferred = $q.defer();
			Api.syncDb(User.getActiveUser().database).then(function() {
				deferred.resolve();
			}).catch(function(err) {
				console.log(err);
				if(err.status === 401) { //Authentication required.
					User.logout();
				}
				deferred.reject(err);
			});
			return deferred.promise;
		});

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

			initialize: function(database) {
				db = new PouchDB(database, {adapter : 'websql'});
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
						sync();
						deferred.resolve(doc);
					}).catch(function(error){
						deferred.reject(error);
					});
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			},

			putAll: function(docs) {
				var deferred = $q.defer();
				docs.forEach(function(doc) {
					doc._id = doc._id || PouchDB.utils.uuid();
				});
				db.bulkDocs(docs).then(function(docs) {
					var keys = docs.map(function(doc) {
						return doc.id;
					});
					db.allDocs({keys: keys, include_docs: true}).then(function(response) {
						//sync();
						deferred.resolve(response.rows.map(function(row) {
							return row.doc;
						}));
					}).catch(function(error) {
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
						sync();
						deferred.resolve(doc);
					}).catch(function(error) {
						deferred.reject(error);
					});
				}).catch(function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			},

			deleteAll: function(docs) {
				var deferred = $q.defer();
				docs.forEach(function(doc) {
					doc._deleted = true;
				});
				db.bulkDocs(docs).then(function(response) {
					//sync();
					deferred.resolve(response);
				}).catch(function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			},

			sync: sync

		};

		return databaseService;

	});