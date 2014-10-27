angular.module('HealthMeasures.user')

	.controller('RegisterController', function($scope, $state, User) {

		$scope.user = {
			username: 'test.helper17@domain.com',
			password: 'testpassword'
		};

		$scope.register = function() {
			User.register($scope.user).then(function() {
				delete $scope.error;
				$state.go('app.start.login');
			}, function(error) {
				$scope.error = error;
			});
		};

		$scope.login = function() {
			$state.go('app.start.login');
		};

	});