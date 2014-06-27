angular.module('HealthMeasures.diary')

.controller('DiaryController', ['$scope', 'Diary', function($scope, Diary) {

		$scope.allEntries = Diary.getAllEntries();

        $scope.entry = {};

        $scope.saveEntry = function() {
            Diary.saveEntry({
                timeStamp: moment().valueOf(),
                narrative: $scope.entry.narrative
            });
            $scope.entry.narrative = '';
            $scope.allEntries = Diary.getAllEntries();
        };
    }]);