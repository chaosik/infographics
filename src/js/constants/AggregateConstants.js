var d3 = require('d3');


var AggregateConstants = [
  { name: 'min', aggregate: d3.min },
  { name: 'max', aggregate: d3.max },
  { name: 'sum', aggregate: d3.sum },
  { name: 'mean', aggregate: d3.mean },
  { name: 'median', aggregate: d3.median }
];

module.exports = AggregateConstants;