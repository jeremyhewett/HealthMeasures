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
							stroke: none;\
						}\
						.line {\
							fill: none;\
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

					$scope.series.forEach(function(parameter, i) {

						var values = parameter.data.filter(function(d) {
							return xValue(d) >= $scope.config.from && xValue(d) <= $scope.config.to;
						});

						var yMin = d3.min(values, yValue);
						var yMax = d3.max(values, yValue);
						var bottomBuffer = i == 0 ? yBuffer : yBuffer / 2;
						var topBuffer = i == $scope.series.length - 1 ? yBuffer : yBuffer / 2;
						var valueScale = d3.scale.linear().domain([yMin, yMax]).range([(i * 100 / $scope.series.length) + bottomBuffer, ((i + 1) * 100 / $scope.series.length) - topBuffer]);
						yMap = function(d) { return yScale(valueScale(yValue(d))); }; // data -> display

						var line = d3.svg.line()
							.x(function(d) { return xScale(xValue(d)); })
							.y(function(d) { return yScale(valueScale(yValue(d))); });

						// draw series
						var gSeries = gPlot.append("g")
							.attr("class", parameter.displayName);

						gSeries.selectAll(".dot")
							.data(values)
							.enter().append("circle")
							.attr("class", "dot")
							.attr("r", 5)
							.attr("cx", xMap)
							.attr("cy", yMap)
							.style("fill", color(i));

						gSeries.append("path")
							.datum(values)
							.attr("class", "line")
							.style("stroke", color(i))
							.attr("d", line);

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