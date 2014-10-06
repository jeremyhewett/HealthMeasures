angular.module('HealthMeasures.common')

	.factory('Database', function($q, $cookies, Config, User) {

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
				db = new PouchDB(User.getActiveUser().database, {adapter : 'websql'});
				$cookies['AuthSession'] = User.getActiveUser().token;
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
					deferred.resolve(response);
				}).catch(function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			},

			sync: function() {
				var sync = PouchDB.sync(Config.couchdbUrl + '/' + User.getActiveUser().database, User.getActiveUser().database)
					.on('complete', function (info) {
						console.log('CouchDB sync complete.');
					}).on('uptodate', function (info) {
						console.log('CouchDB sync uptodate.');
					}).on('error', function (err) {
						console.log('CouchDB sync error: ' + err);
					});
			}

		};

		databaseService.initialize();

		return databaseService;

	});