angular.module('HealthMeasures.user')

	.controller('RegisterController', ['$scope', 'User', function($scope, User) {

		$scope.user = {

		};

		$scope.register = function() {
			User.register($scope.user).then(function(user) {
				$scope.user = user;
				delete $scope.error;
			}, function(error) {
				$scope.error = error;
			});
		};

	}]);