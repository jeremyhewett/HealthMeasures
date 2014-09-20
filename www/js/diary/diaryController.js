angular.module('HealthMeasures.diary')

	.controller('DiaryController', ['$scope', 'Diary', function($scope, Diary) {

		$scope.entry = {};

		Diary.getEntries().then(function(entries) {
			$scope.entries = entries;
		}).catch(function(error) {
			console.error(error);
		});

		$scope.saveEntry = function() {
            Diary.saveEntry($scope.entry.text).then(function(entries) {
				$scope.entries = entries;
			});
            $scope.entry.text = '';
        };
    }]);