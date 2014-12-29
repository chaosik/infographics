var mapValues = require('lodash').mapValues;

/**
 * Enum for focused model mode
 * store lower cased keys as values(wih first letter in upper case)
 * @readonly
 * @enum {string}
 */
var FocusedMode = mapValues({
  RESIZE: '',
  ROTATE: '',
  SCALE: ''
}, function(val, key) {
  return key.charAt(0) + key.substr(1).toLowerCase();
});

module.exports = FocusedMode;