angular.module('HealthMeasures.measurements')

	.controller('MeasurementValuesController', ['$scope', '$stateParams', 'Measurements', function($scope, $stateParams, Measurements) {

		$scope.parameter = Measurements.parameters[$stateParams.parameter];

		$scope.entries = Measurements($scope.parameter.id).getEntries();

		$scope.entry = {};

		$scope.saveMeasurement = function() {
			$scope.entries = Measurements($scope.parameter.id).saveValue($scope.entry.value);
			$scope.entry.value = '';
		};

		$scope.delete = function(entry) {
			$scope.entries = Measurements($scope.parameter.id).deleteEntry(entry);
		};

	}]);