angular.module('HealthMeasures')

	.controller('AppController', function($scope, User) {

		$scope.$watch(User.isAuthorized(), function(isAuthorized) {
			$scope.isAuthorized = isAuthorized;
		});

	});