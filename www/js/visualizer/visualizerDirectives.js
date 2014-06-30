angular.module('HealthMeasures.visualizer')

	.directive('visualizerScatterPlot', ['$filter', 'D3', function($filter, d3) {

		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '='
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

				var margin = {top: 10, right: 10, bottom: 20, left: 30};

				// setup x
				var xValue = function(d) {
						return d.x; }, // data -> value
					xTickFormat = function(timestamp) { return $filter('date')(timestamp);},
					xScale, xMap, xAxis;

				// setup y
				var yValue = function(d) { return d.y; }, // data -> value
					yScale, yMap, yAxis;

				// setup fill color
				var cValue = function(d) { return 0; },
					color = d3.scale.category10();

				// add the graph canvas to the body of the webpage
				var svg = d3.select($elem[0])
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				function redraw() {
					svg.selectAll("*").remove(); //Clear the canvas

					if(!$scope.data) return;

					var svgWidth = $elem.parent().width();
					var svgHeight = $elem.parent().height();

					$elem.css('width', svgWidth + 'px');
					$elem.css('height', svgHeight + 'px');

					var plotWidth = svgWidth - (margin.left + margin.right);
					var plotHeight = svgHeight - (margin.top + margin.bottom);

					var xMin = d3.min($scope.data, xValue);
					var xMax = d3.max($scope.data, xValue);
					xMin -= (xMax - xMin)*0.1;
					xMax += (xMax - xMin)*0.1;
					xScale = d3.scale.linear().domain([xMin, xMax]).range([0, plotWidth]);
					xMap = function(d) { return xScale(xValue(d)); }; // data -> display
					xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(3).tickFormat(xTickFormat);

					var yMin = d3.min($scope.data, yValue);
					var yMax = d3.max($scope.data, yValue);
					yMin -= (yMax - yMin)*0.1;
					yMax += (yMax - yMin)*0.1;
					yScale = d3.scale.linear().domain([yMin, yMax]).range([plotHeight, 0]);
					yMap = function(d) { return yScale(yValue(d)); }; // data -> display
					yAxis = d3.svg.axis().scale(yScale).orient("left");

					$elem.append(style);

					// x-axis
					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + plotHeight + ")")
						.call(xAxis)
						.append("text")
						.attr("class", "label")
						.attr("x", plotWidth)
						.attr("y", -6)
						.style("text-anchor", "end")
						.text("Date");

					// y-axis
					svg.append("g")
						.attr("class", "y axis")
						.call(yAxis)
						.append("text")
						.attr("class", "label")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Entry Length");

					// draw dots
					svg.selectAll(".dot")
						.data($scope.data)
						.enter().append("circle")
						.attr("class", "dot")
						.attr("r", 3.5)
						.attr("cx", xMap)
						.attr("cy", yMap)
						.style("fill", function(d) { return color(cValue(d));});

				}

				$scope.$watch('data', function() {
					redraw();
				});

				$(window).bind("resize", function() {
					redraw();
				});
			}
		};

	}]);