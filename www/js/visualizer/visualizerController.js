angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', ['$scope', 'Measurements', 'Visualizer', function($scope, Measurements, Visualizer) {

		$scope.seriesSelectOptions = [];
		angular.forEach(Measurements.measurementTypes, function(type) {
			$scope.seriesSelectOptions.push({ name: type.displayName, value: type.id });
		});

        $scope.data = Visualizer.getDiaryData();

		$scope.onSeriesSelectionChanged = function() {
			$scope.data = Visualizer.getMeasurementDataFor($scope.series);
		}

    }]);