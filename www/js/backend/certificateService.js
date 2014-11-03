angular.module('HealthMeasures.backend')

	.factory('Certificate', function($q, Config) {

		return {
			check: function() {
				var deferred = $q.defer();

				if(window.plugins && window.plugins.sslCertificateChecker) {
					window.plugins.sslCertificateChecker.check(
						function(message) {
							//Message is always: CONNECTION_SECURE.
							console.log(message);
							deferred.resolve(message);
						},
						function(message) {
							//"CONNECTION_NOT_SECURE" = There is likely a man in the middle attack going on, be careful!
							//"CONNECTION_FAILED" = There was no connection (yet). Internet may be down. Try again (a few times) after a little timeout.
							console.log(message);
							deferred.reject(message);
						},
						Config.server,
						Config.fingerprint);
				} else {
					var message = 'ERROR: sslCertificateChecker plugin missing!';
					console.error(message);
					deferred.resolve(message); //For debug purposes just resolve
				}

				return deferred.promise;
			}
		};

	});