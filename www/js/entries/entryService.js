angular.module('HealthMeasures.entries')

	.factory('EntryService', function($q, Database) {

		function loadEntries(parameterId) {
			var deferred = $q.defer();
			Database.search({
				module: 'entries',
				parameter: parameterId
			}).then(function(entries) {
				deferred.resolve(
					entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					})
				);
			}).catch(function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

		var entryService = {

			load: function(parameterId) {

				var entries;

				var api = {

					getEntries: function() {
						var deferred = $q.defer();
						deferred.resolve(entries);
						return deferred.promise;
					},

					saveValue: function(value) {
						var deferred = $q.defer();
						var entry = {
							module: 'entries',
							parameter: parameterId,
							timeStamp: moment().valueOf(),
							value: value
						};
						Database.put(entry).then(function(entry) {
							entries.push(entry);
							entries.sort(function(a, b) {
								return b.timeStamp - a.timeStamp;
							});
							deferred.resolve(entries);
						}).catch(function(error) {
							deferred.reject(error);
						});
						return deferred.promise;
					},

					deleteEntry: function(entry) {
						var deferred = $q.defer();
						Database.delete(entry).then(function(entry) {
							entries.splice(entries.indexOf(entry), 1);
							deferred.resolve(entries);
						}).catch(function(error) {
							deferred.reject(error);
						});
						return deferred.promise;
					}

				};

				var deferred = $q.defer();

				loadEntries(parameterId).then(function(allEntries) {
					entries = allEntries;
					deferred.resolve(api);
				}).catch(function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			}
		};

		return entryService;
	});