angular.module('HealthMeasures.entries')

	.controller('EntryController', ['$scope', '$stateParams', 'EntryService', 'ParameterService', function($scope, $stateParams, EntryService, ParameterService) {

		$scope.parameter = ParameterService.parameterTypes[$stateParams.parameterId];
		$scope.entries = EntryService($scope.parameter.id).getEntries();
		$scope.entry = {};

		$scope.saveEntry = function() {
			$scope.entries = EntryService($scope.parameter.id).saveValue($scope.entry.value);
			$scope.entry.value = '';
		};

		$scope.delete = function(entry) {
			$scope.entries = EntryService($scope.parameter.id).deleteEntry(entry);
		};

	}]);