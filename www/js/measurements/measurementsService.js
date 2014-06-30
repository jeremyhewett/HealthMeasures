angular.module('HealthMeasures.measurements')

	.factory('Measurements', ['DataType', 'Storage', function(DataType, Storage) {

		var measurementTypes = {

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

		var measurementsService = {

			types: measurementTypes,

			getValuesFor: function(type) {
				return Storage.get('measurements.' + type);
			},

			saveValueFor: function(type, value) {
				Storage.append('measurements.' + type, value);
			}

		};

		return measurementsService;

	}]);