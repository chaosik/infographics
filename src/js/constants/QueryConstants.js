var pluck = require('lodash').pluck;
var d3 = require('d3');
var DataSetTypeConstants = require('./DataSetTypeConstants');

/**
 * @type {{name: string, type: DataSetTypeConstants, query: Function<Array, String>}[]}
 */
var QueryConstants = [
  {
    name: 'for each',
    type: DataSetTypeConstants.Array,
    query: function(collection, column) {
      return pluck(collection, column);
    }
  },
  {
    name: 'min',
    type: DataSetTypeConstants.Number,
    query: function(collection, column) {
      return d3.min(pluck(collection, column));
    }
  },
  {
    name: 'max',
    type: DataSetTypeConstants.Number,
    query: function(collection, column) {
      return d3.max(pluck(collection, column));
    }
  },
  {
    name: 'mean',
    type: DataSetTypeConstants.Number,
    query: function(collection, column) {
      return d3.mean(pluck(collection, column));
    }
  },
  {
    name: 'max',
    type: DataSetTypeConstants.Number,
    query: function(collection, column) {
      return d3.median(pluck(collection, column));
    }
  }
];

module.exports = QueryConstants;