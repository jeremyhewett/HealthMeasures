angular.module('HealthMeasures.visualizer')

    .factory('Visualizer', ['D3', 'Diary', 'Measurements', function(d3, Diary, Measurements) {

        var visualizerService = {

            getDiaryData: function() {
                var diaryEntries = Diary.getAllEntries();
				var data = {
					xAxis: 'Date',
					yAxis: 'Entry length'
				};
                data.values = diaryEntries.map(function(entry) {
                    return {
                        x: entry.timeStamp,
                        y: entry.narrative.length
                    };
                });
				return data;
            },

			getDataForParameter: function(parameterId) {
				var parameter = Measurements.parameters[parameterId];
				var entries = Measurements(parameterId).getEntries();
				var data = {
					xAxis: 'Date',
					yAxis: parameter.displayName,
					units: parameter.units
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