
angular.module('HealthMeasures.common', [

])
	.run(function($rootScope, Database, User) {
		$rootScope.$on('User.login', function(event) {
			var user = User.getActiveUser();
			Database.initialize(user.database);
		});

	});