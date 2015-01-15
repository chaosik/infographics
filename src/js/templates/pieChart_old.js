var d3 = require('d3');
var lodash = require('lodash');
var isArray = lodash.isArray;
var isObject = lodash.isObject;


/**
 * @param {DOMNode} el
 * @param {Array|{value:Number, min: Number, max: Number}} source
 * @param {{width: Number, height: Number}} rectangle
 */
function pieChart(el, source, rectangle) {
  rectangle = rectangle ? rectangle : el.getBoundingClientRect();
  var width = rectangle.width;
  var height = rectangle.height;
  var outerRadius = width / 2;
  var innerRadius = width / 4;
  var data;

  if (isArray(source)) {
    data = source.map(parseFloat);
  } else if (isObject(source)) {
    data = [source.value];
  }

  var color = d3.scale.category10();

  var pie = d3.layout.pie();

  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


  // empty svg tag
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }

  var arcs = d3.select(el).selectAll('path')
      .data(pie(data))
    .enter().append('g')
    .attr('transform', 'translate(' + outerRadius + ', ' + outerRadius + ')');

  arcs.append('path')
    .attr('fill', function (d, i) {
      return color(i);
    })
    .attr('d', arc);

  arcs.append('text')
    .attr('transform', function(d) {
      return 'translate(' + arc.centroid(d) + ')';
    })
    .attr('text-anchor', 'middle')
    .text(function(d) {
      return d.value;
    });
}

module.exports = pieChart;