angular.module('HealthMeasures.user')

	.factory('User', function($http, $q, $window, Config) {

		var activeUser;

		var userService = {

			register: function(user) {
				var deferred = $q.defer();

				$http.post(Config.apiUrl + '/user', user)
					.success(function(response) {
						deferred.resolve(response);
					})
					.error(function(response) {
						deferred.reject(response);
					});

				return deferred.promise;
			},

			login: function(credentials) {
				var deferred = $q.defer();

				$http.post(Config.apiUrl + '/auth', credentials)
					.success(function(response) {
						$window.sessionStorage.setItem('User.activeUser', JSON.stringify(response.user));
						deferred.resolve(response.user);
					})
					.error(function(response) {
						deferred.reject(response);
					});

				return deferred.promise;
			},

			logout: function() {
				$window.sessionStorage.removeItem('User.activeUser');
			},

			getActiveUser: function() {
				return JSON.parse($window.sessionStorage.getItem('User.activeUser'));
			},

			isAuthorized: function() {
				return !!userService.getActiveUser();
			}
		};

		return userService;

	});