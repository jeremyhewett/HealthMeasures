angular.module('HealthMeasures.common')

	.factory('ParameterService', ['DataType', function(DataType) {

		var parameterTypes = {

			weight: {
				id: 'weight',
				displayName: 'Weight',
				shortName: 'Weight',
				type: DataType.number,
				units: 'kg',
				range: [0, null]
			},

			O2: {
				id: 'O2',
				displayName: 'O2 Saturation',
				shortName: 'O2 Sat',
				type: DataType.number,
				units: '%',
				range: [0, 100]
			},

			feeds: {
				id: 'feeds',
				displayName: 'Feeds',
				shortName: 'Feeds',
				type: DataType.number,
				units: 'ml',
				range: [0, null]
			}

		};

		return {
			parameterTypes: parameterTypes
		};

	}]);