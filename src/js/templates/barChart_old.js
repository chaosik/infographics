var d3 = require('d3');
var lodash = require('lodash');
var isArray = lodash.isArray;
var isObject = lodash.isObject;

/**
 * @param {DOMNode} el
 * @param {Array|{value:Number, min: Number, max: Number}} source
 * @param {{width: Number, height: Number}} rectangle
 */
function barChart(el, source, rectangle) {
  rectangle = rectangle ? rectangle : el.getBoundingClientRect();
  var width = rectangle.width;
  var height = rectangle.height;
  var color = d3.scale.category10();
  var data;
  var y = d3.scale.linear()
    .range([height, 0]);

  if (isArray(source)) {
    data = source.map(parseFloat);
    y.domain([d3.min(data), d3.max(data)]);
  } else if (isObject(source)) {
    y.domain([source.min, source.max]);
    data = [source.value];
  } else {
    y.domain([0, 100]);
    data = [source];
  }
  var barWidth = width / data.length;
  barWidth = barWidth >= 2 ? barWidth : 2;

  // empty svg tag
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }

  var bar = d3.select(el)
    .selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('transform', function (d, i) {
      return 'translate(' + (i * barWidth) + ', 0)';
    });

  bar.append('rect')
    .attr('y', function (d) {
      return y(d);
    })
    .attr('height', function (d) {
      return height - y(d);
    })
    .attr('width', barWidth - 1)
    .attr('fill', function(d, i) {
      return color(i);
    });

  bar.append('text')
    .attr('x', barWidth / 2)
    .attr('y', function (d) {
      return y(d) + 3;
    })
    .attr('dy', '.75em')
    .text(function (d) {
      return d;
    });
}

module.exports = barChart;