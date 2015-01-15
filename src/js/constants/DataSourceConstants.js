var mapValues = require('lodash').mapValues;

var prefix = 'DATA_SOURCE_';

/**
 * Enum for data source action
 * @readonly
 * @enum {string}
 */
var DataSourceConstants = mapValues({
  ADD: null,
  SELECT: null
}, function (val, key) {
  return prefix + key;
});

module.exports = DataSourceConstants;