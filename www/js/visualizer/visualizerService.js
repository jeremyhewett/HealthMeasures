angular.module('HealthMeasures.visualizer')

    .factory('Visualizer', ['D3', 'Diary', 'Measurements', 'Storage', function(d3, Diary, Measurements, Storage) {

		var storageKey = 'visualizer.series';

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
					parameterId: parameterId,
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
			},

			saveSelectedParameters: function(series) {
				var storedSeries = Storage.selectAll(storageKey);
				if(storedSeries.length > 0) {
					return Storage.update(storageKey, {
						id: storedSeries[0].id,
						series: series
					});
				}
				return Storage.insert(storageKey, {series: series});
			},

			loadSelectedParameters: function() {
				var storedSeries = Storage.selectAll(storageKey)[0];
				return storedSeries ? storedSeries.series : [];
			}

        };

        return visualizerService;

    }]);