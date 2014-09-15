
angular.module('HealthMeasures.test')

	.factory('EntryMockData', function($q, Config, Database) {

		var service = {

			data: {
				O2: [
					{
						timeStamp: moment('22 Jun, 2014').valueOf(),
						value: 78
					},
					{
						timeStamp: moment('23 Jun, 2014').valueOf(),
						value: 80
					},
					{
						timeStamp: moment('24 Jun, 2014').valueOf(),
						value: 95
					},
					{
						timeStamp: moment('25 Jun, 2014').valueOf(),
						value: 85
					},
					{
						timeStamp: moment('26 Jun, 2014').valueOf(),
						value: 89
					},
					{
						timeStamp: moment('27 Jun, 2014').valueOf(),
						value: 93
					}
				],

				weight: [
					{
						timeStamp: moment('22 Jun, 2014').valueOf(),
						value: 5
					},
					{
						timeStamp: moment('23 Jun, 2014').valueOf(),
						value: 6
					},
					{
						timeStamp: moment('24 Jun, 2014').valueOf(),
						value: 6.5
					},
					{
						timeStamp: moment('25 Jun, 2014').valueOf(),
						value: 6.9
					},
					{
						timeStamp: moment('26 Jun, 2014').valueOf(),
						value: 7.2
					},
					{
						timeStamp: moment('27 Jun, 2014').valueOf(),
						value: 7.2
					}
				],

				feeds: [
					{
						timeStamp: moment('22 Jun, 2014').valueOf(),
						value: 150
					},
					{
						timeStamp: moment('23 Jun, 2014').valueOf(),
						value: 140
					},
					{
						timeStamp: moment('24 Jun, 2014').valueOf(),
						value: 200
					},
					{
						timeStamp: moment('25 Jun, 2014').valueOf(),
						value: 180
					},
					{
						timeStamp: moment('26 Jun, 2014').valueOf(),
						value: 170
					},
					{
						timeStamp: moment('27 Jun, 2014').valueOf(),
						value: 180
					}
				],

				temperature: [
					{
						timeStamp: moment('22 Jun, 2014').valueOf(),
						value: 36
					},
					{
						timeStamp: moment('23 Jun, 2014').valueOf(),
						value: 38
					},
					{
						timeStamp: moment('24 Jun, 2014').valueOf(),
						value: 39
					},
					{
						timeStamp: moment('25 Jun, 2014').valueOf(),
						value: 39
					},
					{
						timeStamp: moment('26 Jun, 2014').valueOf(),
						value: 37
					},
					{
						timeStamp: moment('27 Jun, 2014').valueOf(),
						value: 37
					}
				]

			},

			initialize: function() {
				return initialized;
			}

		};

		var deferred = $q.defer();
		var initialized = deferred.promise;

		(function() {
			if(Config.injectMockData) {
				var entries = [];
				angular.forEach(service.data, function(data, key) {
					entries = entries.concat(data.map(function(entry) {
						return angular.extend(entry, {module: 'entries', parameter: key});
					}));
				});

				Database.search({
					module: 'entries'
				}).then(function(oldEntries) {
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
