
angular.module('HealthMeasures.test')

	.factory('MeasurementMockData', [function() {

		var measurementMockData = {

			O2: [78, 80, 95, 85, 89, 93]

		};

		return measurementMockData;
	}])

	.run(['Config', 'Storage', 'MeasurementMockData', function(Config, Storage, MeasurementMockData) {

		if(Config.injectMockData) {
			Storage.set('measurement.O2.values', MeasurementMockData.O2);
		}

	}]);
