angular.module('HealthMeasures.measurement')

	.factory('Measurement', ['DataType', function(DataType) {

		var measurementTypes = {

			weight: {
				displayName: 'Weight',
				shortName: 'Weight',
				type: DataType.number,
				units: 'kg',
				range: [0, null]
			},

			O2: {
				displayName: 'O2 Saturation',
				shortName: 'O2 Sat',
				type: DataType.number,
				units: '%',
				range: [0, 100]
			},

			feeds: {
				displayName: 'Feeds',
				shortName: 'Feeds',
				type: DataType.number,
				units: 'ml',
				range: [0, null]
			}

		};

		var measurementService = {

			types: measurementTypes,

			getValuesFor: function(type) {
				var dataString = window.localStorage['measurement.O2.values' + type];
				if(dataString) {
					return angular.fromJson(dataString);
				}
				return [];
			},

			saveValueFor: function(type) {
				var dataString = window.localStorage['measurement.O2.values' + type];
				if(dataString) {
					return angular.fromJson(dataString);
				}
				return [];
			}

		};

		return measurementService;

	}]);