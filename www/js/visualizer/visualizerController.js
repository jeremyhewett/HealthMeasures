angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', ['$scope', 'Measurements', 'Visualizer', function($scope, Measurements, Visualizer) {

		$scope.seriesSelectOptions = [];
		angular.forEach(Measurements.parameters, function(type) {
			$scope.seriesSelectOptions.push({ name: type.displayName, value: type.id });
		});

        $scope.data = Visualizer.getDiaryData();

		$scope.onParameterSelectionChanged = function() {
			$scope.data = Visualizer.getDataForParameter($scope.parameter);
		}

    }]);