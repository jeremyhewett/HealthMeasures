angular.module('HealthMeasures')

	.factory('App', function($location, $rootScope, User) {

		return {
			initialize: function() {
				if(User.isAuthorized()) {
					$rootScope.$broadcast('User.login', User.getActiveUser());
				}
				$location.path('/app/tab/home');
			}
		};

	});