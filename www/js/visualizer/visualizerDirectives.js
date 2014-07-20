angular.module('HealthMeasures.visualizer')

	.directive('visualizerScatterPlot', ['$filter', 'D3', function($filter, d3) {

		return {
			restrict: 'E',
			replace: true,
			scope: {
				series: '=',
				config: '='
			},
			template: '<svg version="1.1"></svg>',
			link: function($scope, elem, attrs) {
				var $elem = $(elem);

				var style = '<style>\
						.axis path,\
						.axis line {\
							fill: none;\
							stroke: #000;\
							shape-rendering: crispEdges;\
						}\
						.dot {\
							stroke: #000;\
						}\
					</style>';

				var svgPadding = {top: 10, right: 30, bottom: 25, left: 30};
				var plotMargin = {top: 0, right: 80, bottom: 0, left: 0};
				var yBuffer = 6;

				// setup x
				var xValue = function(d) { return d.x; }, // data -> value
					xTickFormat = function(timestamp) { return $filter('shortDate')(timestamp);},
					xScale, xMap, xAxis;

				// setup y
				var yValue = function(d) { return d.y; }, // data -> value
					yScale, yMap, yAxis;

				// setup fill color scale
				var	color = d3.scale.category10();

				// add the graph canvas to the body of the webpage
				var svg = d3.select($elem[0])
					.append("g")
					.attr("transform", "translate(" + svgPadding.left + "," + svgPadding.top + ")");

				var gPlot = svg.append("g")
					.attr("transform", "translate(" + plotMargin.left + "," + plotMargin.top + ")");

				function redraw() {
					gPlot.selectAll("*").remove(); //Clear the plot area

					if(!$scope.series || ! $scope.series.length) return;

					var svgWidth = $elem.parent().width();
					var svgHeight = $elem.parent().height();

					$elem.css('width', svgWidth + 'px');
					$elem.css('height', svgHeight + 'px');

					var plotWidth = svgWidth - (svgPadding.left + svgPadding.right) - (plotMargin.left + plotMargin.right);
					var plotHeight = svgHeight - (svgPadding.top + svgPadding.bottom) - (plotMargin.top + plotMargin.bottom);

					xScale = d3.scale.linear().domain([$scope.config.from, $scope.config.to]).range([0, plotWidth]);
					xMap = function(d) { return xScale(xValue(d)); }; // data -> display
					xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickValues([$scope.config.from, $scope.config.to]).tickFormat(xTickFormat);

					yScale = d3.scale.linear().domain([0, 100]).range([plotHeight, 0]);
					yAxis = d3.svg.axis().scale(yScale).orient("left").tickValues([]);

					$elem.append(style);

					// x-axis
					gPlot.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + plotHeight + ")")
						.call(xAxis);

					$scope.series.forEach(function(data, i) {

						var yMin = d3.min(data.values, yValue);
						var yMax = d3.max(data.values, yValue);
						var bottomBuffer = i == 0 ? yBuffer : yBuffer / 2;
						var topBuffer = i == $scope.series.length - 1 ? yBuffer : yBuffer / 2;
						var valueScale = d3.scale.linear().domain([yMin, yMax]).range([(i * 100 / $scope.series.length) + bottomBuffer, ((i + 1) * 100 / $scope.series.length) - topBuffer]);
						yMap = function(d) { return yScale(valueScale(yValue(d))); }; // data -> display

						// draw series
						var gSeries = gPlot.append("g")
							.attr("class", data.yAxis);
						gSeries.selectAll(".dot")
							.data(data.values)
							.enter().append("circle")
							.attr("class", "dot")
							.attr("r", 3.5)
							.attr("cx", xMap)
							.attr("cy", yMap)
							.style("fill", function(d) { return color(i);});

					});

				}

				$scope.$watch('series', function() {
					redraw();
				}, true);

				$(window).bind("resize", function() {
					redraw();
				});
			}
		};

	}]);