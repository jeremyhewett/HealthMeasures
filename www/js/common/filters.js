angular.module('HealthMeasures.common')

	.filter('date', ['Formats', function(Formats) {
		return function(timestamp) {
			return moment(timestamp).format(Formats.date);
		}
	}])

	.filter('shortDate', ['Formats', function(Formats) {
		return function(timestamp) {
			return moment(timestamp).format(Formats.shortDate);
		}
	}])

	.filter('dateTime', ['Formats', function(Formats) {
		return function(timestamp) {
			return moment(timestamp).format(Formats.dateTime);
		}
	}]);