angular.module('HealthMeasures.visualizer')

    .factory('Visualizer', function($q, D3, Diary, Database, EntryService) {

		function getOrCreate(criteria) {
			var deferred = $q.defer();
			Database.search(criteria).then(function(records) {
				if(records.length) {
					deferred.resolve(records[0]);
				} else {
					Database.put(criteria).then(function(entity) {
						deferred.resolve(entity);
					}).catch(function(error) {
						deferred.reject(error);
					});
				}
			}).catch(function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

        var visualizerService = {

            getDataForParameter: function(parameterId) {
				var deferred = $q.defer();
				EntryService.forParameter(parameterId).getEntries().then(function(entries) {
					deferred.resolve(entries.map(function(entry) {
						return {
							x: entry.timeStamp,
							y: entry.value
						};
					}));
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			},

			saveSelectedParameters: function(parameters) {
				var deferred = $q.defer();
				getOrCreate({
					module: 'visualizer',
					key: 'series'
				}).then(function(entity) {
					entity.value = parameters;
					Database.put(entity).then(function(entity) {
						deferred.resolve(entity.value);
					}).catch(function(error) {
						deferred.reject(error);
					});
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			},

			loadSelectedParameters: function() {
				var deferred = $q.defer();
				getOrCreate({
					module: 'visualizer',
					key: 'series'
				}).then(function(entity) {
					deferred.resolve(entity.value || []);
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			}

        };

        return visualizerService;

    });