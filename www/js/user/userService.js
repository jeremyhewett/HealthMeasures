angular.module('HealthMeasures.user')

	.factory('User', ['$http', '$q', 'Config', function($http, $q, Config) {

		var userService = {
			register: function(user) {
				var deferred = $q.defer();

				$http.post(Config.apiUrl + '/user/register', user)
					.success(function(response) {
						user.id = response._id;
						deferred.resolve(user);
					})
					.error(function(response) {
						deferred.reject(response);
					});

				return deferred.promise;
			}
		};

		return userService;

	}]);