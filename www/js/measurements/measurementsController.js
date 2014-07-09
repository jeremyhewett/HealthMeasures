angular.module('HealthMeasures.measurements')

.controller('MeasurementsController', ['$scope', 'Packages', function($scope, Packages) {

	$scope.parameters = Packages.currentPackage().parameters;

}]);