
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
			]

		};

		return measurementsMockData;
	}])

	.run(['Config', 'Storage', 'MeasurementsMockData', function(Config, Storage, MeasurementsMockData) {

		if(Config.injectMockData) {
			Storage.set('measurements.O2', MeasurementsMockData.O2);
		}

	}]);
