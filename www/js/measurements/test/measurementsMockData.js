
angular.module('HealthMeasures.test')

	.factory('MeasurementsMockData', [function() {

		var measurementsMockData = {

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
			]

		};

		return measurementsMockData;
	}])

	.run(['Config', 'Storage', 'MeasurementsMockData', function(Config, Storage, MeasurementsMockData) {

		if(Config.injectMockData) {
			angular.forEach(MeasurementsMockData, function(data, key) {
				Storage.deleteAll('measurements.' + key);
				data.forEach(function(entry) {
					Storage.insert('measurements.' + key, entry);
				});
			});
		}

	}]);
