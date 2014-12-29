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
  OPEN: '',
  CLEAR_RECTANGLE: '',
  HIDE: ''
}, function (val, key) {
  return prefix + key;
});

module.exports = DialogConstants;