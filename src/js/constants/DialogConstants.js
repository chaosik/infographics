var mapValues = require('lodash').mapValues;

var prefix = 'DIALOG_';

/**
 * Enum for dialog oriented actions,
 * every value is prefixed with DIALOG
 * to prevent action collisions
 * @readonly
 * @enum {string}
 */
var DialogConstants = mapValues({
  OPEN: null,
  CLEAR_RECTANGLE: null,
  HIDE: null,
  CLOSE: null
}, function (val, key) {
  return prefix + key;
});

module.exports = DialogConstants;