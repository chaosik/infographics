var map = require('lodash').map;

/**
 * Callback invoked in _.map function inside mapKeyValues
 * @param {string} value
 * @param {*} key
 * @returns {{key: string, value: *}}
 * @private
 */
function _mapKeyValuesTransform(value, key) {
  return { key: key, value: value };
}

/**
 * Transform object into array of objects
 * containing key and value of every object property
 * @param {Object} object
 * @returns {Array<{key: {string}, value: *}>}
 */
function mapKeyValues(object) {
  return map(object, _mapKeyValuesTransform);
}

module.exports = mapKeyValues;