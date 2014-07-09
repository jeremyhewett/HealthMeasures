angular.module('HealthMeasures.common')

	.directive('inline', [function() {
		return {
			restrict: 'A',
			link: function($scope, $elem, attrs) {
				$elem.css('display', 'inline-block');
			}
		}
	}]);