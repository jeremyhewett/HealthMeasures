angular.module('HealthMeasures.measurement')

	.controller('MeasurementController', ['$scope', 'Measurement', function($scope, Measurement) {

		//$scope.measurementType = //Need to get this from stateProvider. url should be: /measurement/typeId
		$scope.O2 = Measurement.getValuesFor('O2');

		$scope.saveMeasurement = function() {
			Measurement.saveValueFor('O2', $scope.newValue);
			$scope.newValue = '';
			$scope.O2 = Measurement.getValuesFor('O2');
		};
	}]);