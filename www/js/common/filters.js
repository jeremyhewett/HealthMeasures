angular.module('HealthMeasures.filters', [])

	.filter('date', ['Formats', function(Formats) {
		return function(timestamp) {
			return moment(timestamp).format(Formats.date);
		}
	}])

	.filter('dateTime', ['Formats', function(Formats) {
		return function(timestamp) {
			return moment(timestamp).format(Formats.dateTime);
		}
	}]);