angular.module('HealthMeasures.measurements')

.controller('MeasurementValuesController', ['$scope', '$stateParams', 'Measurements', function($scope, $stateParams, Measurements) {

	$scope.measurementType = $stateParams.measurementType;
	$scope.values = Measurements.getValuesFor($scope.measurementType);

	$scope.entry = {};

	$scope.saveMeasurement = function() {
		Measurements.saveValueFor($scope.measurementType, $scope.entry.value);
		$scope.entry.value = '';
		$scope.values = Measurements.getValuesFor($scope.measurementType);
	};
}]);