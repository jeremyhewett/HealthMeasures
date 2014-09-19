angular.module('HealthMeasures.user')

	.factory('User', [function($http, $q, Config) {

		var registeredUser = {id: 'jeremy'};

		var userService = {
			register: function(user) {
				var deferred = $q.defer();

				$http.post(Config.apiUrl + '/user/register', user)
					.success(function(response) {
						user.id = response._id;
						registeredUser = user;
						deferred.resolve(user);
					})
					.error(function(response) {
						deferred.reject(response);
					});

				return deferred.promise;
			},

			logout: function() {
				registeredUser = undefined;
			},

			registeredUser: function() {
				return registeredUser;
			},

			isAuthorized: function() {
				return !!registeredUser;
			}
		};

		return userService;

	}]);