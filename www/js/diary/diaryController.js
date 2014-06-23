angular.module('HealthMeasures.diary')

.controller('DiaryController', ['$scope', 'Diary', function($scope, Diary) {
        //var entries = diaryMockData.entries;
        //Diary.saveAllEntries(entries);
        $scope.allEntries = Diary.getAllEntries();

        $scope.entry = {};

        $scope.saveEntry = function() {
            Diary.saveEntry({
                timeStamp: new Date().getTime(),
                narrative: $scope.entry.narrative
            });
            $scope.entry.narrative = '';
            $scope.allEntries = Diary.getAllEntries();
        };
    }]);