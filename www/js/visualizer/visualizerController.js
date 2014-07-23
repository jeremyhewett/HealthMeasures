angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', ['$ionicPopup', '$scope', 'ParameterService', 'Visualizer', function($ionicPopup, $scope, ParameterService, Visualizer) {

		$scope.parameters = {
			list: [],
			map: {}
		};

		$scope.chart = {
			config: {
				from: moment('22 Jun 2014', 'DD MMM YYYY').valueOf(),
				to: moment('26 Jun 2014', 'DD MMM YYYY').valueOf()
			},
			series: []
		};

		function initialize() {
			angular.forEach(ParameterService.parameterTypes, function(type) {
				var parameter = angular.extend(angular.copy(type), {
					isActive: false
				});
				$scope.parameters.map[type.id] = parameter;
				$scope.parameters.list.push(parameter);
			});

			Visualizer.loadSelectedParameters().forEach(function(parameterId) {
				if(parameterId && $scope.parameters.map[parameterId]) {
					$scope.parameters.map[parameterId].isActive = true;
				}
			});

			redraw();
		}

		function redraw() {
			$scope.chart.series = [];
			var parameterIds = [];
			$scope.parameters.list.forEach(function(parameter) {
				if(parameter.isActive) {
					parameter.data = Visualizer.getDataForParameter(parameter.id);
					$scope.chart.series.push(parameter);
					parameterIds.push(parameter.id);
				}
			});
			Visualizer.saveSelectedParameters(parameterIds);
		}

		$scope.activeParameters = function() {
			return $scope.parameters.list.filter(function(parameter) {
				return parameter.isActive;
			})
		};

		$scope.showPopup = function() {
			var myPopup = $ionicPopup.show({
				templateUrl: 'templates/visualizer/toggleParameters.html',
				title: 'Select Parameters',
				scope: $scope,
				buttons: [{ text: 'Done' }]
			});
			myPopup.then(function(res) {
				redraw();
			});
		};

		initialize();

    }]);