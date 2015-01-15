var mapValues = require('lodash').mapValues;

var prefix = 'FILES_TO_READ_';

/**
 * Enum for data source action
 * @readonly
 * @enum {string}
 */
var DataSourceConstants = mapValues({
  UPLOAD: null,
  ADD: null,
  REMOVE: null
}, function (val, key) {
  return prefix + key;
});

module.exports = DataSourceConstants;