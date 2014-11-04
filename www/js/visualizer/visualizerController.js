angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', function($ionicModal, $q, $scope, ParameterService, Visualizer) {

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

			Visualizer.loadSelectedParameters().then(function(parameterIds) {
				parameterIds.forEach(function(parameterId) {
					if(parameterId && $scope.parameters.map[parameterId]) {
						$scope.parameters.map[parameterId].isActive = true;
					}
				});
				redraw();
			}).catch(function(error) {
				console.error(error);
			});
		}

		function redraw() {
			$scope.chart.series = [];
			var parameterIds = [];
			var start = $q.defer();
			start.resolve();
			var promise = start.promise;
			$scope.parameters.list.forEach(function(parameter) {
				if(parameter.isActive) {
					var deferred = $q.defer();
					promise.then(function() {
						Visualizer.getDataForParameter(parameter.id).then(function(data) {
							parameter.data = data;
							$scope.chart.series.push(parameter);
							deferred.resolve();
						}).catch(function(error) {
							console.error(error);
							deferred.resolve();
						});
					});
					promise = deferred.promise;
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

		$ionicModal.fromTemplateUrl('templates/visualizer/toggleParameters.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.selectParameters = function() {
			$scope.modal.show();
		};

		$scope.submitParameters = function() {
			$scope.modal.hide();
			redraw();
		};

		$scope.$on('$destroy', function() {
			if($scope.modal) {
				$scope.modal.remove();
			}
		});

		initialize();
	});