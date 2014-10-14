angular.module('HealthMeasures.entries')

	.controller('EntryController', ['$scope', '$stateParams', 'EntryService', 'ParameterService', function($scope, $stateParams, EntryService, ParameterService) {

		$scope.parameter = ParameterService.parameterTypes[$stateParams.parameterId];
		$scope.entry = {};

		var entryService;

		entryService = EntryService.forParameter($scope.parameter.id);

		entryService.getEntries().then(function(entries) {
			$scope.entries = entries;
		}).catch(function(error) {
			console.error(error.message);
		});

		$scope.saveEntry = function() {
			entryService.saveValue($scope.entry.value).then(function(entries) {
				$scope.entries = entries;
			}).catch(function(error) {
				console.error(error.message);
			});
			$scope.entry.value = '';
		};

		$scope.deleteEntry = function(entry) {
			entryService.deleteEntry(entry).then(function(entries) {
				$scope.entries = entries;
			}).catch(function(error) {
				console.error(error.message);
			});
		};

		$scope.refresh = function() {
			entryService.refresh().then(function(entries) {
				$scope.entries = entries;
			}).catch(function(error) {
				console.error(error.message);
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

	}]);