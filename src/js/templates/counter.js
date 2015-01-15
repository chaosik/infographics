var d3 = require('d3');
var lodash = require('lodash');
var defaults = lodash.defaults;
var ShapeStore = require('../stores/ShapeStore');


var defaultProps = {
  shape: 'rectangle',
  rows: '2',
  cols: '10',
  min: '0',
  max: '100',
  labels: 'true',
  labelColor: '#000',
  shapeSpacing: '2',
  shapeHeight: '10',
  shapeWidth: '10'
};

function getShape(shapeName) {
  return ShapeStore.getShapeByName(shapeName);
}

/**
 * @param {Object} properties
 * @param {HTMLElement} el
 * @param {Array} data
 */
function counter(properties, el, data) {
  var props = defaults(properties, defaultProps);
  var height = parseFloat(props.shapeHeight);
  var width = parseFloat(props.shapeWidth);
  var spacing = parseFloat(props.shapeSpacing);
  var min = parseFloat(props.min);
  var max = parseFloat(props.max);

  var rows = parseInt(props.rows, 10);
  var cols = parseInt(props.cols, 10);

  var shapeCount = rows * cols;
  var scale = d3.scale.linear()
    .range([0, shapeCount])
    .domain([min, max]);

  var shapeArray = [];
  var value = scale(data);
  value =
    value >= max ? shapeCount :
    value <= min ? 0 :
    value;

  var len = parseInt(value, 10);
  for (var i = 0; i < len; ++i) {
    shapeArray.push(i);
  }

  var groupWidth = width + (spacing * 2);
  var groupHeight = height + (spacing * 2);

  var shapeGroups = d3.select(el)
    .selectAll('g')
      .data(shapeArray)
    .enter().append('g')
    .attr('transform', function (d, i) {
      return 'translate(' + ((i % cols) * groupWidth) + ',' + (parseInt(i / cols, 10) * groupHeight) + ')';
    })
      .append('g')
    .attr('transform', 'translate(' + spacing + ', ' + spacing + ')');

  var shapeString =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '" viewBox="0 0 100 100">' +
      getShape(props.shape) +
    '</svg>';
  var shapeNode;
  for (i = 0, len = shapeGroups[0].length; i < len; ++i) {
    shapeNode = new DOMParser().parseFromString(shapeString, 'application/xml');
    shapeGroups[0][i].appendChild(shapeGroups[0][i].ownerDocument.importNode(shapeNode.documentElement, true));
  }

  //if (props.labels === 'true') {
  //  bar.append('text')
  //    .attr('x', barWidth / 2)
  //    .attr('y', function (d) {
  //      return y(d) + 3;
  //    })
  //    .attr('dy', '.75em')
  //    .text(function (d) {
  //      return d;
  //    })
  //    .attr('fill', props.labelColor === 'auto' ? function(d, i) {
  //      return color(i);
  //    } : props.labelColor);
  //}
}

module.exports = counter;