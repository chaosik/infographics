var mapValues = require('lodash').mapValues;

var prefix = 'DATA_SET_';

/**
 * Enum for data set actions
 * @readonly
 * @enum {string}
 */
var DataSetConstants = mapValues({
  GET: null,
  ADD: null,
  EDIT: null,
  REMOVE: null
}, function (val, key) {
  return prefix + key;
});

module.exports = DataSetConstants;