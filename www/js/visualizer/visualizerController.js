angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', ['$scope', 'Measurements', 'Visualizer', function($scope, Measurements, Visualizer) {

		$scope.parameterOptions = [];
		$scope.dataSeries = [];
		Visualizer.loadSelectedParameters().forEach(function(parameterId) {
			$scope.dataSeries.push(Visualizer.getDataForParameter(parameterId));
		});

		angular.forEach(Measurements.parameters, function(type) {
			$scope.parameterOptions.push({ name: type.displayName, value: type.id });
		});

        $scope.onParameterSelectionChanged = function(parameterId) {
			var index = $scope.dataSeries.indexOf($scope.dataSeries.filter(function(series) {
				return series.parameterId == parameterId;
			})[0]);
			if(index > -1) {
				$scope.dataSeries.splice(index, 1)
			} else {
				$scope.dataSeries.push(Visualizer.getDataForParameter(parameterId));
			}
			$scope.dataSeries = angular.copy($scope.dataSeries);
			Visualizer.saveSelectedParameters($scope.dataSeries.map(function(series) {
				return series.parameterId;
			}));
		};

		$scope.remove = function(series) {
			$scope.dataSeries.splice($scope.dataSeries.indexOf(series), 1);
			$scope.dataSeries = angular.copy($scope.dataSeries);
			Visualizer.saveSelectedParameters($scope.dataSeries.map(function(series) {
				return series.parameterId;
			}));
		}

    }]);