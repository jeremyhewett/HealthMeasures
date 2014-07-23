angular.module('HealthMeasures.services', [])

	.factory('Formats', function() {
		var formats = {
			date: 'MMM DD YYYY',
			shortDate: 'MMM DD',
			dateTime: 'MMM DD YYYY HH:mm'
		};
		return formats;
	});