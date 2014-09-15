angular.module('HealthMeasures.diary')

.factory('Diary', function($q, Database) {

		var entries = [];

		var diaryService = {

            getEntries: function() {
				var deferred = $q.defer();
				Database.search({
					module: 'diary'
				}, ['timeStamp']).then(function(response) {
					entries = response.reverse();
					deferred.resolve(entries);
				}).catch(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
            },

            saveEntry: function(text) {
				var deferred = $q.defer();
				var entry = {
					module: 'diary',
					timeStamp: moment().valueOf(),
					text: text
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
            }
        };

        return diaryService;

    });