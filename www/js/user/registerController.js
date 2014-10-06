angular.module('HealthMeasures.user')

	.controller('RegisterController', function($scope, $state, User) {

		$scope.user = {
			username: 'test.helper17@domain.com',
			password: 'testpassword'
		};

		$scope.login = function() {
			User.login($scope.user).then(function(user) {
				$scope.user = user;
				delete $scope.error;
				$state.go('app.tab.home');
			}, function(error) {
				$scope.error = error;
			});
		};

		$scope.register = function() {
			User.register($scope.user).then(function() {
				delete $scope.error;
				$scope.login();
			}, function(error) {
				$scope.error = error;
			});
		};

	});