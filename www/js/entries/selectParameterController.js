angular.module('HealthMeasures.entries')

.controller('SelectParameterController', ['$scope', 'ParameterService', function($scope, ParameterService) {

	$scope.parameters = ParameterService.parameterTypes;

}]);