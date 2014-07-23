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
						.text {\
							stroke: none;\
							fill: #000;\
						}\
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
						.legend {\
							fill: none;\
						}\
					</style>';

				var svgPadding = {top: 10, right: 20, bottom: 25, left: 30};
				var plotMargin = {top: 0, right: 110, bottom: 0, left: 0};
				var legendMargin = {top: 0, right: 0, bottom: 0, left: 20};
				var yBuffer = 5;

				// setup x
				var xValue = function(d) { return d.x; }, // data -> value
					xTickFormat = function(timestamp) { return $filter('shortDate')(timestamp);},
					xScale, xMap, xAxis;

				// setup y
				var yValue = function(d) { return d.y; }, // data -> value
					yScale, yMap;

				// setup fill color scale
				var	colors = ['#423A38', '#47B8C8', '#BDB9B0'];

				// add the graph canvas to the body of the webpage
				var svg = d3.select($elem[0])
					.append("g")
					.attr("transform", "translate(" + svgPadding.left + "," + svgPadding.top + ")");

				function redraw() {
					svg.selectAll("*").remove(); //Clear the plot area

					if(!$scope.series || ! $scope.series.length) return;

					var gPlot = svg.append("g")
						.attr("transform", "translate(" + plotMargin.left + "," + plotMargin.top + ")");

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

					$elem.append(style);

					var gLegend = svg.append("g")
						.attr("transform", "translate(" + (plotMargin.left + plotWidth + legendMargin.left) + "," + plotMargin.top + ")");

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
						var yRange = [(i * 100 / $scope.series.length) + yBuffer, ((i + 1) * 100 / $scope.series.length) - yBuffer];
						var paramScale = d3.scale.linear().domain([yMin, yMax]).range([yScale(yRange[0]), yScale(yRange[1])]);
						yMap = function(d) { return paramScale(yValue(d)); };

						var line = d3.svg.line()
							.x(function(d) { return xScale(xValue(d)); })
							.y(function(d) { return paramScale(yValue(d)); });

						// draw series
						var gSeries = gPlot.append("g")
							.attr("class", parameter.id);

						gSeries.selectAll(".dot")
							.data(values)
							.enter().append("circle")
							.attr("class", "dot")
							.attr("r", 5)
							.attr("cx", xMap)
							.attr("cy", yMap)
							.style("fill", colors[i]);

						gSeries.append("path")
							.datum(values)
							.attr("class", "line")
							.style("stroke", colors[i])
							.attr("d", line);

						var yAxis = d3.svg.axis().scale(paramScale).orient("right")
						if(values.length) yAxis.tickValues([yMin, yMax]);
						gLegend.append("g")
							.attr("class", "y axis")
							.call(yAxis)
							.append("text")
							.attr("class", "label")
							.attr("x", 10)
							.attr("y", paramScale.range()[1] + (paramScale.range()[0] - paramScale.range()[1]) / 2)
							.attr("dy", ".3em")
							.style("text-anchor", "center")
							.style('fill', colors[i])
							.text(parameter.shortName + " (" + parameter.units + ")" );

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