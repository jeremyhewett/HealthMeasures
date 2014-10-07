
angular.module('HealthMeasures.entries')

	.factory('EntryService', function($q, Database) {

		var entryService = {

			forParameter: function(parameterId) {

				var entries;

				var api = {

					getEntries: function() {
						var deferred = $q.defer();
						Database.search({
							module: 'entries',
							parameter: parameterId
						}, ['timeStamp']).then(function(response) {
							entries = response.reverse();
							deferred.resolve(entries);
						}).catch(function(error) {
							deferred.reject(error);
						});
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
						Database.put(entry).then(function(entity) {
							entries.push(entity);
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
						Database.delete(entry).then(function(entity) {
							entries.splice(entries.indexOf(entry), 1);
							deferred.resolve(entries);
						}).catch(function(error) {
							deferred.reject(error);
						});
						return deferred.promise;
					},

					refresh: function() {
						var deferred = $q.defer();
						Database.sync().then(function() {
							api.getEntries().then(function(entries) {
								deferred.resolve(entries);
							}).catch(function(error) {
								deferred.reject(error);
							});
						}).catch(function(error) {
							deferred.reject(error);
						});
						return deferred.promise;
					}

				};

				return api;
			}
		};

		return entryService;
	});