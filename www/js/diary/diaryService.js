angular.module('HealthMeasures.diary')

.factory('Diary', function() {

		window.localStorage['diaryEntries'] = angular.toJson(diaryMockData.entries);

        var diaryService = {

            getAllEntries: function() {
                var dataString = window.localStorage['diaryEntries'];
                if(dataString) {
                    return angular.fromJson(dataString);
                }
                return [];
            },

            saveEntry: function(entry) {
                var entries = diaryService.getAllEntries();
                entries.push(entry);
                entries.sort(function(a, b) {
                    return b.timeStamp - a.timeStamp;
                });
                diaryService.saveAllEntries(entries);
            },

            saveAllEntries: function(entries) {
                entries.sort(function(a, b) {
                    return b.timeStamp - a.timeStamp;
                });
                window.localStorage['diaryEntries'] = angular.toJson(entries);
            }
        };

        return diaryService;

    });