var d3 = require('d3');
var lodash = require('lodash');
var defaults = lodash.defaults;

var defaultProps = {
  outerRadius: 50,
  innerRadius: 0,
  labels: 'false',
  labelColor: '#000'
};

/**
 * @param {Object} properties
 * @param {HTMLElement} el
 * @param {Array} data
 */
function pieChart(properties, el, data) {
  var props = defaults(properties, defaultProps);
  var outerRadius = props.outerRadius;
  var innerRadius = props.innerRadius;
  var color = d3.scale.category10();

  var pie = d3.layout.pie();

  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  var arcs = d3.select(el).selectAll('path')
    .data(pie(data))
    .enter().append('g')
    .attr('transform', 'translate(' + outerRadius + ', ' + outerRadius + ')');

  arcs.append('path')
    .attr('fill', function (d, i) {
      return color(i);
    })
    .attr('d', arc);

  if (props.label === 'true') {
    arcs.append('text')
      .attr('transform', function (d) {
        return 'translate(' + arc.centroid(d) + ')';
      })
      .attr('text-anchor', 'middle')
      .attr('fill', this.props.labelColor)
      .text(function (d) {
        return d.value;
      });
  }
}

module.exports = pieChart;