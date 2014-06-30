angular.module('HealthMeasures.diary')

.factory('Diary', ['Storage', function(Storage) {

		var key = 'diary.entries';

		var diaryService = {

            getAllEntries: function() {
				return Storage.get(key);
            },

            saveEntry: function(entry) {
                Storage.append(key, entry, {sort: function(a, b) {
					return b.timeStamp - a.timeStamp;
				}});
            }
        };

        return diaryService;

    }]);