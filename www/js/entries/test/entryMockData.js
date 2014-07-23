
angular.module('HealthMeasures.test')

	.factory('EntryMockData', [function() {

		var entryMockData = {

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

		};

		return entryMockData;
	}])

	.run(['Config', 'Storage', 'EntryMockData', function(Config, Storage, EntryMockData) {

		if(Config.injectMockData) {
			angular.forEach(EntryMockData, function(data, key) {
				Storage.deleteAll('entries.' + key);
				data.forEach(function(entry) {
					Storage.insert('entries.' + key, entry);
				});
			});
		}

	}]);
