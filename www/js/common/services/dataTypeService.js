angular.module('HealthMeasures.common')

	.factory('DataType', [function() {

		var dataTypes = {
			text: 'text',
			number: 'number',
			boolean: 'boolean',
			dateTime: 'dateTime'
		};

		return dataTypes;

	}]);