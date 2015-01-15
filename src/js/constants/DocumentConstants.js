var mapValues = require('lodash').mapValues;

var prefix = 'DOCUMENT_';

/**
 * @readonly
 * @enum {string}
 */
var DocumentConstants = mapValues({
  ADD: null,
  SELECT: null,
  UPDATE: null,
  REMOVE: null
}, function(val, key) {
  return prefix + key;
});

module.exports = DocumentConstants;
