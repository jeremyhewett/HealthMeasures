angular.module('HealthMeasures.measurements')

.controller('MeasurementValuesController', ['$scope', '$stateParams', 'Measurements', function($scope, $stateParams, Measurements) {

	$scope.measurementType = Measurements.measurementTypes[$stateParams.measurementType];

	$scope.entries = Measurements.getEntriesFor($scope.measurementType.id);

	$scope.entry = {};

	$scope.saveMeasurement = function() {
		Measurements.saveEntryFor($scope.measurementType.id,
			{
				timeStamp: moment().valueOf(),
				value: $scope.entry.value
			});
		$scope.entry.value = '';
		$scope.entries = Measurements.getEntriesFor($scope.measurementType.id);
	};
}]);