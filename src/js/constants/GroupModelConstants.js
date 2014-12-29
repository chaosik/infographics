var mapValues = require('lodash').mapValues;

var prefix = 'GROUP_MODEL_';

/**
 * @readonly
 * @enum {string}
 */
var GroupModelConstants = mapValues({
  CREATE: '',
  UPDATE: '',
  FOCUS: '',
  DRAG: '',
  DESTROY: ''
}, function (val, key) {
  return prefix + key;
});

module.exports = GroupModelConstants;