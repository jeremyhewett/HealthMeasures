
angular.module('HealthMeasures.test')

	.factory('DiaryMockData', function($q, Config, Database) {

		var service = {

			entries: [
				{
					timeStamp: moment('22 Jun, 2014').valueOf(),
					text: 'This is my latest entry.'
				},
				{
					timeStamp: moment('20 Jun, 2014').valueOf(),
					text: 'This is my 2nd entry.'
				},
				{
					timeStamp: moment('Jun 19, 2014').valueOf(),
					text: 'This is my first entry.'
				},
				{
					timeStamp: moment('19 Jun, 2014').valueOf(),
					text: 'Another entry.'
				}
			],

			initialize: function() {
				return initialized;
			}

		};

		var deferred = $q.defer();
		var initialized = deferred.promise;

		(function() {
			if(Config.injectMockData) {
				var entries = service.entries.map(function(entry) {
					return angular.extend(entry, {module: 'diary'});
				});

				Database.search({module: 'diary'}).then(function(oldEntries) {
					Database.deleteAll(oldEntries).then(function() {
						Database.putAll(entries).then(function(entries) {
							deferred.resolve(entries);
						}).catch(function(error) {
							console.error(error);
							deferred.resolve();
						});
					}).catch(function(error) {
						console.error(error);
						deferred.resolve();
					});
				}).catch(function(error) {
					console.error(error);
					deferred.resolve();
				});
			} else {
				deferred.resolve();
			}
		})();

		return service;
	});