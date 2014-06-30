
angular.module('HealthMeasures.test')

	.factory('MeasurementsMockData', [function() {

		var measurementsMockData = {

			O2: [78, 80, 95, 85, 89, 93]

		};

		return measurementsMockData;
	}])

	.run(['Config', 'Storage', 'MeasurementsMockData', function(Config, Storage, MeasurementsMockData) {

		if(Config.injectMockData) {
			Storage.set('measurements.O2.values', MeasurementsMockData.O2);
		}

	}]);
