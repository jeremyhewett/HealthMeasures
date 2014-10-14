angular.module('HealthMeasures')

	.controller('LoadingController', function($scope, $ionicLoading) {
		$ionicLoading.show({
			template: 'Loading...'
		});

		$scope.$on("$destroy", function handler() {
			$ionicLoading.hide();
		});

	});
