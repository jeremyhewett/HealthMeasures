angular.module('HealthMeasures')

	.controller('AppController', function($scope, $state, User) {

		$scope.$watch(User.isAuthorized, function(isAuthorized) {
			$scope.isAuthorized = isAuthorized;
			if(!$scope.isAuthorized) {
				$state.go('app.login');
			}
		});

	});