angular.module('HealthMeasures.diary')

.factory('Diary', ['Storage', function(Storage) {

		var key = 'diary.entries';

		var diaryService = {

            getAllEntries: function() {
				return Storage.selectAll(key).sort(function(a, b) {
					return b.timeStamp - a.timeStamp;
				});
            },

            saveEntry: function(entry) {
                var entries = Storage.insert(key, entry);
				return entries.sort(function(a, b) {
					return b.timeStamp - a.timeStamp;
				});
            }
        };

        return diaryService;

    }]);