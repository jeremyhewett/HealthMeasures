angular.module('HealthMeasures.measurements')

.controller('MeasurementsController', ['$scope', 'Packages', function($scope, Packages) {

	$scope.measurements = Packages.currentPackage().measurements;

}]);