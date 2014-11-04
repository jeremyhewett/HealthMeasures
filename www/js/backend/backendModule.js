
angular.module('HealthMeasures.backend', [

])
	.run(function($rootScope, ipCookie, User) {
		$rootScope.$on('User.login', function(event, user) {
			for(var key in user.cookie) {
				ipCookie(key, user.cookie[key], {path: '/api/db/', secure: true});
			}
		});
	});