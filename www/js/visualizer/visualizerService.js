angular.module('HealthMeasures.visualizer')

    .factory('Visualizer', ['D3', 'Diary', function(d3, Diary) {

        var visualizerService = {

            getDiaryData: function() {
                var diaryEntries = Diary.getAllEntries();
                return diaryEntries.map(function(entry) {
                    return {
                        x: entry.timeStamp,
                        y: entry.narrative.length
                    };
                });
            }

        };

        return visualizerService;

    }]);