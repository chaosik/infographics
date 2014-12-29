var mapValues = require('lodash').mapValues;

var prefix = 'MODEL_';

var ModelConstants = mapValues({
  CREATE: '',
  UPDATE: '',
  DESTROY: ''
}, function (val, key) {
  return prefix + key;
});

module.exports = ModelConstants;