angular.module('HealthMeasures')

	.controller('AppController', function($ionicSideMenuDelegate, $scope, $state, User) {

		$scope.$watch(User.isAuthorized, function(isAuthorized) {
			$scope.isAuthorized = isAuthorized;
			if(!$scope.isAuthorized) {
				$state.go('app.start.login');
			}
		});

		$scope.toggleMenu = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};

		$scope.logout = function() {
			User.logout();
		};

	});