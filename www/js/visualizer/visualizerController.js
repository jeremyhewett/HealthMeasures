angular.module('HealthMeasures.visualizer')

    .controller('VisualizerController', ['$scope', 'Visualizer', function($scope, Visualizer) {

        $scope.diaryData = Visualizer.getDiaryData();

    }]);