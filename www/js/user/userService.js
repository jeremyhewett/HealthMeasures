angular.module('HealthMeasures.user')

	.factory('User', function($q, $rootScope, $window, Api, Config) {

		var activeUser;

		var userService = {

			register: function(user) {
				var deferred = $q.defer();

				Api.post(Config.server + 'user', user)
					.then(function(response) {
						deferred.resolve(response);
					})
					.catch(function(response) {
						deferred.reject(response);
					});

				return deferred.promise;
			},

			login: function(credentials) {
				var deferred = $q.defer();

				Api.post('auth', credentials)
					.then(function(response) {
						$window.sessionStorage.setItem('User.activeUser', JSON.stringify(response.user));
						$rootScope.$broadcast('User.login', response.user);
						deferred.resolve(response.user);
					})
					.catch(function(response) {
						deferred.reject(response);
					});

				return deferred.promise;
			},

			logout: function() {
				$window.sessionStorage.removeItem('User.activeUser');
			},

			getActiveUser: function() {
				try {
					return JSON.parse($window.sessionStorage.getItem('User.activeUser'));
				} catch(err) {

				}
			},

			isAuthorized: function() {
				return !!userService.getActiveUser();
			}
		};

		return userService;

	});