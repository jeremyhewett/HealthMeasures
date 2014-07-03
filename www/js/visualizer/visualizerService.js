angular.module('HealthMeasures.visualizer')

    .factory('Visualizer', ['D3', 'Diary', 'Measurements', function(d3, Diary, Measurements) {

        var visualizerService = {

            getDiaryData: function() {
                var diaryEntries = Diary.getAllEntries();
				var data = {
					xAxisLabel: 'Date',
					yAxisLabel: 'Entry length'
				};
                data.values = diaryEntries.map(function(entry) {
                    return {
                        x: entry.timeStamp,
                        y: entry.narrative.length
                    };
                });
				return data;
            },

			getMeasurementDataFor: function(measurementTypeId) {
				var measurementType = Measurements.measurementTypes[measurementTypeId];
				var entries = Measurements.getValuesFor(measurementType.id);
				var data = {
					xAxisLabel: 'Date',
					yAxisLabel: measurementType.units
				};
				data.values = entries.map(function(entry) {
					return {
						x: entry.timeStamp,
						y: entry.value
					};
				});
				return data;
			}

        };

        return visualizerService;

    }]);