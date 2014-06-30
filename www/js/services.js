angular.module('HealthMeasures.services', [])

	.factory('Formats', function() {
		var formats = {
			date: 'MMM DD YYYY',
			dateTime: 'MMM DD YYYY HH:mm'
		};
		return formats;
	});