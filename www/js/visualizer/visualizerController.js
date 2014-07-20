angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', ['$scope', 'Measurements', 'Visualizer', function($scope, Measurements, Visualizer) {

		$scope.parameterOptions = [];

		$scope.chart = {
			config: {
				from: moment('22 Jun 2014', 'DD MMM YYYY').valueOf(),
				to: moment('27 Jun 2014', 'DD MMM YYYY').valueOf()
			},
			series: []
		};

		Visualizer.loadSelectedParameters().forEach(function(parameterId) {
			$scope.chart.series.push(Visualizer.getDataForParameter(parameterId));
		});

		angular.forEach(Measurements.parameters, function(type) {
			$scope.parameterOptions.push({ name: type.displayName, value: type.id });
		});

        $scope.onParameterSelectionChanged = function(parameterId) {
			var index = $scope.chart.series.indexOf($scope.chart.series.filter(function(series) {
				return series.parameterId == parameterId;
			})[0]);
			if(index > -1) {
				$scope.chart.series.splice(index, 1)
			} else {
				$scope.chart.series.push(Visualizer.getDataForParameter(parameterId));
			}
			$scope.chart.series = angular.copy($scope.chart.series);
			Visualizer.saveSelectedParameters($scope.chart.series.map(function(series) {
				return series.parameterId;
			}));
		};

		$scope.remove = function(series) {
			$scope.chart.series.splice($scope.chart.series.indexOf(series), 1);
			$scope.chart.series = angular.copy($scope.chart.series);
			Visualizer.saveSelectedParameters($scope.chart.series.map(function(series) {
				return series.parameterId;
			}));
		}

    }]);