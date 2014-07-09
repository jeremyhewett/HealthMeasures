angular.module('HealthMeasures.measurements')

	.factory('Measurements', ['DataType', 'Storage', function(DataType, Storage) {

		var parameters = {

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

		var measurementsService = function(parameterId) {

			return {

				getEntries: function() {
					var entries = Storage.selectAll('measurements.' + parameterId);
					return entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					});
				},

				saveValue: function(value) {
					var entry = {
						timeStamp: moment().valueOf(),
						value: value
					};
					var entries = Storage.insert('measurements.' + parameterId, entry);
					return entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					});
				},

				deleteEntry: function(entry) {
					var entries = Storage.delete('measurements.' + parameterId, entry.id);
					return entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					});
				}

			};

		};

		measurementsService.parameters = parameters;

		return measurementsService;

	}]);