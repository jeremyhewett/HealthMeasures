angular.module('HealthMeasures.visualizer')

	.directive('visualizerScatterPlot', ['D3', function(d3) {

		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '='
			},
			template: '<svg version="1.1"></svg>',
			link: function($scope, $elem, attrs) {

				$elem.append('<style>\
						.axis path,\
						.axis line {\
							fill: none;\
							stroke: #000;\
							shape-rendering: crispEdges;\
						}\
						.dot {\
							stroke: #000;\
						}\
					</style>');

				var margin = {top: 10, right: 10, bottom: 20, left: 30};

				var width = parseInt($elem.parent().css('width')) - (margin.left + margin.right);
				var height = parseInt($elem.parent().css('height')) - (margin.top + margin.bottom);

				$elem.css('width', (width + margin.left + margin.right) + 'px');
				$elem.css('height', (height + margin.top + margin.bottom) + 'px');

				// setup x
				var xValue = function(d) { return d.x; }, // data -> value
					xScale = d3.scale.linear().range([0, width]), // value -> display
					xMap = function(d) { return xScale(xValue(d)); }, // data -> display
					xAxis = d3.svg.axis().scale(xScale).orient("bottom");

				// setup y
				var yValue = function(d) { return d.y; }, // data -> value
					yScale = d3.scale.linear().range([height, 0]), // value -> display
					yMap = function(d) { return yScale(yValue(d)); }, // data -> display
					yAxis = d3.svg.axis().scale(yScale).orient("left");

				// setup fill color
				var cValue = function(d) { return 0; },
					color = d3.scale.category10();

				// add the graph canvas to the body of the webpage
				var svg = d3.select($elem[0])
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				$scope.$watch('data', function(data) {

					svg.selectAll("*").remove(); //Clear the canvas

					if(!data) return;

					xScale = d3.scale.linear().domain([d3.min(data, xValue), d3.max(data, xValue)]).range([0, width]);
					yScale = d3.scale.linear().domain([d3.min(data, yValue), d3.max(data, yValue)]).range([0, height]);

					xAxis = d3.svg.axis().scale(xScale).orient("bottom");

					// x-axis
					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis)
						.append("text")
						.attr("class", "label")
						.attr("x", width)
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
						.data(data)
						.enter().append("circle")
						.attr("class", "dot")
						.attr("r", 3.5)
						.attr("cx", xMap)
						.attr("cy", yMap)
						.style("fill", function(d) { return color(cValue(d));});

				});
			}
		};

	}]);