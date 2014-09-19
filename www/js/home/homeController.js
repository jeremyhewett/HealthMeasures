angular.module('HealthMeasures.home')

	.controller('HomeController', function($scope, User) {

		$scope.logout = function() {
			User.logout();
		};

	});