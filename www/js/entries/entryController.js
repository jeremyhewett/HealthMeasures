angular.module('HealthMeasures.entries')

	.controller('EntryController', ['$scope', '$stateParams', 'EntryService', 'ParameterService', function($scope, $stateParams, EntryService, ParameterService) {

		$scope.parameter = ParameterService.parameterTypes[$stateParams.parameterId];
		$scope.entry = {};

		var entryService;

		EntryService.load($scope.parameter.id).then(function(api) {
			entryService = api;
			init();
		});

		function init() {
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

			$scope.delete = function(entry) {
				entryService.deleteEntry(entry).then(function(entries) {
					$scope.entries = entries;
				}).catch(function(error) {
					console.error(error.message);
				});
			};
		}

	}]);