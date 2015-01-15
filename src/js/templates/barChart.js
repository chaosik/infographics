var d3 = require('d3');
var lodash = require('lodash');
var defaults = lodash.defaults;

var defaultProps = {
  width: 100,
  height: 100,
  min: 'auto',
  max: 'auto',
  color: 'auto',
  mode: 'vertical',
  labels: 'false',
  labelColor: '#000'
};

/**
 * @param {Object} properties
 * @param {HTMLElement} el
 * @param {Array} data
 */
function barChart(properties, el, data) {
  var props = defaults(properties, defaultProps);
  var color = d3.scale.category10();
  var height = props.height;
  var width = props.width;
  var min = props.min === 'auto' ? d3.min(data) : props.min;
  var max = props.max === 'auto' ? d3.max(data) : props.max;

  var y = d3.scale.linear()
    .range([height, 0])
    .domain([min, max]);

  var barWidth = width / data.length;
  barWidth = barWidth >= 2 ? barWidth : 2;

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
    .attr('fill', props.color === 'auto' ? function(d, i) {
      return color(i);
    } : props.color);

  if (props.labels === 'true') {
    bar.append('text')
      .attr('x', barWidth / 2)
      .attr('y', function (d) {
        return y(d) + 3;
      })
      .attr('dy', '.75em')
      .text(function (d) {
        return d;
      })
      .attr('fill', props.labelColor === 'auto' ? function(d, i) {
        return color(i);
      } : props.labelColor);
  }
}

module.exports = barChart;